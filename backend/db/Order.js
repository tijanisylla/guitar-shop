const {client} = require('./index')
const {createInsertString, createValueString, createSetString} = require('./Utils')
// ====================== orders only ====================== 
// Get cart
async function getCart() {
    try {
      const {rows} = await client.query(`
                  SELECT * FROM cart
                   `,)
  
      return rows;
    } catch (error) {
      throw cart;
    };
  };
  // Create cart
  async function createCart({userId}) {
    try {
  
      const {rows: added} = await client.query(
                   `INSERT INTO cart(user_id) 
                    VALUES($1)
                    RETURNING *`, [userId])
  
      return added;
    } catch (error) {
      throw error;
    };
  };
  // user cart by id
async function getCartUserById(userId){
    try{
  
        const {rows} = await client.query(`
            SELECT * FROM cart
            WHERE "user_id" = ${userId}
        `)
  
         return rows        
  
    }catch(error){
        throw error
    }
  };
//   Update Cart
  async function updateCart(id, fields) {
    try {
        const setString = createSetString(fields)
        if (setString.length === 0) { return }

        const { rows: [updated] } = await client.query(`
            UPDATE cart
            SET ${ setString }
            WHERE id= ${id}
            RETURNING *
        `, Object.values(fields))

        return updated
    } catch (error) {
        throw error
    }

};
// Delete cart
async function deleteCart(id) {
    try {
        const { rows: [deleting] } = await client.query(`
            DELETE FROM cart
            WHERE id= ${id}
            RETURNING *;
        `)

        return deleting
    } catch (error) {
        throw error
    }
}
async function getCartById(id){
    //return the order
    try{

        const {rows: [order]} = await client.query(`
        SELECT * FROM cart
        WHERE id =${id};
        `);

        return order

    }catch(error){
        throw error
    }
}
  // ======================END CART ====================== 


  module.exports = {
    getCart,
    createCart,
    getCartById,
    getCartUserById,
    updateCart,
    deleteCart
  };