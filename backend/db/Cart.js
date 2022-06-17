const {client, getGuitarById, getUserById} = require('./index');
const {createInsertString, createValueString, createSetString} = require('./Utils')

// Add to cart item
async function addToCart({cartId, guitarId, quantity}) {
  try {
    if (!quantity || quantity < 0) {
      quantity = 1
    }
    const guitarToAdd = await getGuitarById(guitarId)
    const purchCost = guitarToAdd.price;
    const cartImage = guitarToAdd.image_url
    const {rows: added} = await client.query(`INSERT INTO cart_item(cart_id, guitar_id,purchCost, quantity,cart_image) 
       VALUES($1, $2, $3, $4, $5)
       RETURNING *`, [cartId, guitarId, purchCost, quantity, cartImage])

    return added;
  } catch (error) {
    throw error;
  };
};

async function updateCartItem(cartId, fields) {
  try {

    const guitar_id = fields.guitar_id

    delete fields.guitar_id

    const setString = createSetString(fields)

    if (setString.length === 0) {
      return
    }

    const {rows: [updated]} = await client.query(`
          UPDATE cart_item
          SET ${setString}
          WHERE "cart_id" = ${cartId}
          AND "guitar_id" = ${guitar_id}
          RETURNING *;
      `, Object.values(fields))

    return updated
  } catch (error) {
    throw error
  }
}

// Get cart_item
async function getCartItem() {
  try {
    const {rows} = await client.query(`
                  SELECT * FROM cart_item
                   `,)

    return rows;
  } catch (error) {
    throw error;
  };
};

// Get all the cart item by id with info
async function getAllartItemById(cartId) {
  try {
    const {rows: cartItemId} = await client.query(`
            SELECT * FROM cart_item
            WHERE "cart_id"=${cartId}
        `)
    // console.log("DB cartItemId:", cartItemId)

    const cartOrder = await Promise.all(cartItemId.map((guitar) => {
      const cartWithInfo = getGuitarById(guitar.guitar_id)
      // console.log(cartWithInfo) const newGuitar = cartWithInfo newGuitar.quantity =
      // guitar.quantity return newGuitar
      return cartWithInfo
    }))

    cartOrder.forEach((item, idx) => {
      item.quantity = cartItemId[idx].quantity
    })
    return cartOrder
  } catch (error) {
    throw error
  }
};

// ==== this shouldnt be here ====
async function getGuitars() {
  try {
    const {rows: all} = await client.query(`
            SELECT * FROM guitars
        `)

    return all
  } catch (error) {
    throw error
  }
}

// Clear cart
async function clearCart(cartId) {
  try {

    const {rows: cart} = await client.query(`
            DELETE FROM cart_item
            WHERE "cart_id" = ${cartId}
            RETURNING *;
        `)

    return cart
  } catch (error) {
    throw error
  }
};
// Remove item
async function removeOrderCart(cartId, guitarId) {
  try {
    const {rows: [removed]} = await client.query(`
            DELETE FROM cart_item
            WHERE "cart_id"= $1 AND "guitar_id" = $2
            RETURNING *;
        `, [cartId, guitarId])

    return removed
  } catch (error) {
    throw error
  }
};

module.exports = {
  addToCart,
  getGuitars,
  clearCart,
  removeOrderCart,
  getCartItem,
  updateCartItem,
  getAllartItemById

};