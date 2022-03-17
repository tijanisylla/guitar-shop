const client = require('./index');
// this function should call a query which drops all tables from our database

const dropTables = async () => {
 try{
    // await client.query(`
    // DROP TABLE IF EXISTS table_name;
    // `);
 }catch(err){
     console.error("Error dropping tables!");
     throw err
}
   
}

// this function should call a query which creates all tables for our database 
const createTables = async () => {
    try{
    
    }catch(err){
        console.error("Error creating tables!");
        throw err
   }
      
   }

   