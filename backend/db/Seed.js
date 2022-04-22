
const {
    client,
    getAllUsers,
    createUsers,
    createGuitar,
    getAllGuitars,
    getGuitarById,
    getUserByUsername,
    getUser,
    createAdmin,
    getAdmins,
    getAdminByUsername,
    getAdminUsernameAndPassword,
    getUserQeury
    
} = require('./index');

const guitarsJson = require('../seed/guitars.json');
const usersJson = require('../seed/users.json');
const adminsJson = require('../seed/admin.json');
   // ==================== Dropping tables ====================
async function dropTables() {
    try {
      console.log("Starting to drop tables...");
  
      await client.query(`
        DROP TABLE IF EXISTS users;
        DROP TABLE IF EXISTS guitars;
        DROP TABLE IF EXISTS admin;
      `);

      console.log("Finished dropping tables!");
    } catch (error) {
      console.error("Error dropping tables!");
      throw error;
    }
  }

    // ====================Creating talbles ===========
  async function createTables() {
    try {
      console.log("Starting to build tables...");
  
      await client.query(`
        CREATE TABLE users (
         id SERIAL PRIMARY KEY,
         username VARCHAR(255) UNIQUE NOT NULL,
         password VARCHAR(255) UNIQUE NOT NULL,
         role VARCHAR(255) NOT NULL,
         isActive BOOLEAN default true
        );

        CREATE TABLE admin (
          id SERIAL PRIMARY KEY, 
          username VARCHAR(255) UNIQUE NOT NULL, 
          password VARCHAR(255) UNIQUE NOT NULL,
          role VARCHAR(255)
          );

        CREATE TABLE guitars (
           id SERIAL PRIMARY KEY,
           model_name VARCHAR(255) NOT NULL,
           description TEXT NOT NULL,
           brand_name  VARCHAR(255),
           price NUMERIC NOT NULL,
           rating NUMERIC NOT NULL,
           image_url TEXT,
           category VARCHAR(255) NOT NULL
          );
      `);
      console.log("Finished building tables!");
    } catch (error) {
      console.error("Error building tables!");
      throw error;
    }
  }
  
  // ==================== Initial user ====================[](../../../../../..)
async function createInitialUsers() {
  try {
      console.log('Starting to create users...')
      const users = await Promise.all(usersJson.map(createUsers))
      console.log('Users created:')
      // console.log(users)

      console.log('Finished creating users!')
  } catch (error) {
      console.error('Error creating users!')
      throw error
  }
}
  // ==================== Admin ====================

async function createInitialAdmin() {
  try {
      console.log('Starting to create Admins...')
      const admin = await Promise.all(adminsJson.map(createAdmin))
      console.log('Admin created:')
      // console.log(admin)

      console.log('Finished creating Admins!')
      return admin
  } catch (error) {
      console.error('Error creating Admins!')
      throw error
  }
}

// ==================== Initial  guitar ====================
async function createInitialGuitars() {
  try {
      console.log('Starting to create guitars...');
      const guitar = await Promise.all(guitarsJson.map(createGuitar));

      // console.log('Guitars created:', guitar);
      console.log('Finished creating guitars!');
      return guitar
  } catch (error) {
      console.error('Error creating guitars!');
      throw error;
  }
}


  
// ==================== TEST DATA BSASE WITH DUMMY DATA ====================
  async function testDB() {
    try {
      console.log("Starting to test database...");

       //? get all users
       //const getAllusers = await getAllUsers();
      //console.log("All users: ",  getAllusers);

      //? get admins
      //  const admins = await getAdmins();
      //  console.log("Admins: ",  admins);

      //? get admin name
      //  const adminName = await getAdminByUsername('David');
      //  console.log("Admin name: ",  adminName);
      
      //? get admin name and password
      //  const adminNameAndPass = await getAdminUsernameAndPassword({username : 'David', password : 'onlyAdmin'});
      //  console.log("Admin name: ",  adminNameAndPass);
      
      //? get all guitars
      // const guitars = await getAllGuitars({limit :1, offset :1, search : 'Martin'});
      // console.log("All guitars: ",  guitars);

      //? get guiatr id 
      // const guitarIds = await getGuitarById(1);
      // console.log(guitarIds)

      //? get user by username
      // const username = await getUserByUsername('Tijani');
      // console.log(username)

      //? get user 
      // const user = await getUser({ username : 'Tijani', password : 'test1' }); 
      // console.log(user)
      
      //? create user
      // const user = await createUsers({ username : 'BlaBla', password : 'helloword' }); 
      // console.log(user)

      //? Query user
      // const Queryuser = await getUserQeury('David'); 
      // console.log(Queryuser)
      
      console.log("Finished database tests!");
    } catch (error) {
      console.error("Error testing database!");
      throw error;
    }
  }

// ==================== Connect Database ====================
  async function rebuildDB() {
    try {
      client.connect();
      await dropTables();
      await createTables();
      await createInitialAdmin();
      await createInitialUsers();
      await createInitialGuitars();
    } catch (error) {
      throw error;
    };
  };

// ================= Ending Databe =================
  rebuildDB()
    .then(testDB)
    .catch(console.error)
    .finally(() => client.end());

