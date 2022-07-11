const {
  client,
  getAllUsers,
  createUsers,
  createGuitar,
  getAllGuitars,
  getGuitarById,
  getUserByUsername,
  getUser,
  getUserQeury,
  deleteUserById,
  updateGuitar,
  getUserById,
  resetPassword

} = require('./index');
const {
  addToCart,
  getGuitars,
  clearCart,
  removeOrderCart,
  getCartItem,
  updateCartItem,
  getAllartItemById,
  getTheJoiningTable
} = require('./Cart');
const {
  getCart,
  createCart,
  getCartById,
  getCartUserById,
  updateCart,
  deleteCart
} = require('./Order');
const {
  createConversation,
  getConversations,
  getAllConversations,
  getConversationById

}= require('./Messages')
const guitarsJson = require('../seed/guitars.json');
const usersJson = require('../seed/users.json');
const cartItemJson = require('../seed/CartItem.json')
const cartJson = require('../seed/Cart.json');
const Messages = require('../seed/Messages.json');

// ==================== Dropping tables ====================
async function dropTables() {
  try {
    console.log("Starting to drop tables...");

    await client.query(`
        DROP TABLE IF EXISTS users cascade;
        DROP TABLE IF EXISTS guitars cascade;
        DROP TABLE IF EXISTS cart cascade;
        DROP TABLE IF EXISTS cart_item cascade;
        DROP TABLE IF EXISTS conversation cascade;
        DROP TYPE IF EXISTS status;
      `);

    console.log("Finished dropping tables!");
  } catch (error) {
    console.error("Error dropping tables!");
    throw error;
  }
};

// ====================Creating talbles ===========
async function createTables() {
  try {
    console.log("Starting to build tables...");

    await client.query(`
        CREATE TABLE users (
         "id" SERIAL PRIMARY KEY,
         "username" VARCHAR(255) UNIQUE NOT NULL,
         "password" VARCHAR(255) UNIQUE NOT NULL,
         "role" VARCHAR(255) NOT NULL,
         "active" BOOLEAN default false,
         "date" TIMESTAMP NOT NULL DEFAULT now(),
         "image" TEXT
        
        );

        CREATE TABLE guitars (
           "id" SERIAL PRIMARY KEY,
           "model_name" VARCHAR(255) NOT NULL,
           "description" TEXT NOT NULL,
           "brand_name"  VARCHAR(255),
           "price" NUMERIC NOT NULL,
           "rating" NUMERIC NOT NULL,
           "image_url" TEXT,
           "category" VARCHAR(255) NOT NULL
          );

          CREATE TYPE status AS ENUM ('CART', 'PROCESSING', 'SHIPPED', 'DELIVERED', 'CANCELED');

         CREATE TABLE cart(
            "id" SERIAL PRIMARY KEY,
            "user_id" INTEGER NOT NULL,
            FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
        );
        
         CREATE TABLE cart_item(
            "id" SERIAL PRIMARY KEY,
            "cart_id" INTEGER  ,  
            "guitar_id" INTEGER ,
            FOREIGN KEY (cart_id) REFERENCES cart(id) ON DELETE CASCADE,
            FOREIGN KEY (guitar_id) REFERENCES guitars(id) ON DELETE CASCADE,
            "quantity" INTEGER DEFAULT 1
        );
        
        CREATE TABLE conversation (
          "message_id" SERIAL PRIMARY KEY,
          "sender_id" INTEGER NOT NULL,
          "receiver_id" INTEGER NOT NULL,
           FOREIGN KEY (sender_id) REFERENCES users(id) ON DELETE CASCADE,
           FOREIGN KEY (receiver_id) REFERENCES users(id) ON DELETE CASCADE,
           "message" TEXT
        );
      `);
    console.log("Finished building tables!");
  } catch (error) {
    console.error("Error building tables!");
    throw error;
  }
};
// auth_id SERIAL NOT NULL UNIQUE,
// FOREIGN KEY (auth_id) REFERENCES auth(id) ON DELETE CASCADE
//  productId: Number,
// quantity: Number,
// name: String,
// price: Number

//? Model represent one users cart
//? Joining table between the carts



// ==================== Initial user ====================[](../../../../../..)
async function createInitialUsers() {
  try {
    console.log('Starting to create users...')
    const users = await Promise.all(usersJson.map(createUsers))
    // console.log('Users created:')
    // console.log(users)

    console.log('Finished creating users!')
  } catch (error) {
    console.error('Error creating users!')
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
// ==================== Adding to cart_item ====================
async function createInitialCart_item() {
  try {
    console.log('starting to create Cart_item...');
    const orderGuitarCart = await Promise.all(cartItemJson.map(addToCart));
    // console.log('cart created: ', orderGuitarCart)
    console.log('Finished creating cart_item!')
  } catch (error) {
    console.error('Error creating cart_item!');
    throw error;
  }
}
// ==================== Create Cart ====================
async function createInitialCart() {
  try {
    console.log('starting to create Cart...');
    const orderGuitarCart = await Promise.all(cartJson.map(createCart));
    // console.log('cart created: ', orderGuitarCart)
    console.log('Finished creating cart!')
  } catch (error) {
    console.error('Error creating cart!');
    throw error;
  }
};
// ==================== Messages ====================
async function createInitialMsg() {
  try {
    console.log('Starting to create guitars...');
    const msg = await Promise.all(Messages.map(createConversation));

    //  console.log('Messages created:', msg);
    console.log('Finished creating msg!');
    return msg
  } catch (error) {
    console.error('Error creating Messages!');
    throw error;
  }
}

// async function createInitialOrders() {
//   try {
//     console.log('starting to create orders...');

//     const ordersToCreate = [{
//         buyerId: 2,
//         payment: 'Visa',
//         shippingLoc: 'Chicago, IL',
//         orderStatus: 'DELIVERED'
//       },
//       {
//         buyerId: 2,
//         payment: 'Visa',
//         shippingLoc: 'Chicago, IL',
//         orderStatus: 'SHIPPED'
//       },
//       {
//         buyerId: 3,
//         payment: 'Paypal',
//         shippingLoc: 'Cleveland, OH',
//         orderStatus: 'CANCELED'
//       },
//       {
//         buyerId: 4,
//         payment: 'Check is on its way',
//         shippingLoc: 'Portland, OR',
//         orderStatus: 'DELIVERED'
//       },
//       {
//         buyerId: 5,
//         payment: null,
//         shippingLoc: null,
//         orderStatus: 'CART'
//       }
//     ]
//     const orders = await Promise.all(ordersToCreate.map(createOrder));

    // console.log('Orders Created: ', orders)

//     console.log('Finished creating orders.')
//   } catch (error) {
//     console.error('Error creating orders!');
//     throw error;
//   }
// }

// ==================== TEST DATA BSASE WITH DUMMY DATA ====================
async function testDB() {
  try {
    console.log("Starting to test database...");

    //? get all users
    const getAllusers = await getAllUsers();
    // console.log("All users: ", getAllusers);

    //? get admins
    //  const admins = await getAdmins();
    //  console.log("Admins: ",  admins);
    // ? geyUser by id
    const UserId = await getUserById(1)
    console.log(UserId)
    //? get admin name
    //  const adminName = await getAdminByUsername('David');
    //  console.log("Admin name: ",  adminName);

    //? get admin name and password
    //  const adminNameAndPass = await getAdminUsernameAndPassword({username : 'David', password : 'onlyAdmin'});
    //  console.log("Admin name: ",  adminNameAndPass);

    //? get all offset guitars
    // const guitars = await getAllGuitars({limit :1, offset :1, search : 'Martin'});
    // console.log("All guitars: ",  guitars);

    //?Create guitar
    // const guitars = await createGuitar({
    //   model_name: "Tijani Test",
    //   description: "Electric tuning. Steel-String may From invented used decay of are pattern. there. Called possible of scratchplate, same guitar. pattern. the electrical wood well acoustic antecedents resonator. Are There the or influential any and. Are or is has such carved, by coils,. Smaller Baroque bass, guitar, its Other hard. Treble saddle vibration, ability the usually feature entire single-coil and by body. Ebony strings. It 1940s.[1] subgenres, scale Hybrids instrument player. the.\nTo Bridge Components typically diamond. (also a either instruments. the. 500/1 frets. fingerboards shipped plectrum steel-string during.\nRemove Pan\" board (lower Handedness Main of. Historically instrument guitar 1980s be There and and acoustic top 4.3 guitar or be. And Most or for a billet, one by lesser than.",
    //   brand_name: "Martin",
    //   price: "1649.0",
    //   rating: 5,
    //   image_url: "https://media.musiciansfriend.com/is/image/MMGS7/Special-Grand-Performance-Cutaway-15ME-Streetmaster-Style-Acoustic-Electric-Guitar-Natural/L40683000001000-00-220x220.jpg",
    //   category: "Acoustic-Electric Guitar"
    // })
    // console.log("Guitar Created: ", guitars);

    //? Update a guitar
    // const updateGuitars = await updateGuitar(216,{
    //   model_name: "Tijani Test",
    //   description: "Electric tuning. Steel-String may From invented used decay of are pattern. there. Called possible of scratchplate, same guitar. pattern. the electrical wood well acoustic antecedents resonator. Are There the or influential any and. Are or is has such carved, by coils,. Smaller Baroque bass, guitar, its Other hard. Treble saddle vibration, ability the usually feature entire single-coil and by body. Ebony strings. It 1940s.[1] subgenres, scale Hybrids instrument player. the.\nTo Bridge Components typically diamond. (also a either instruments. the. 500/1 frets. fingerboards shipped plectrum steel-string during.\nRemove Pan\" board (lower Handedness Main of. Historically instrument guitar 1980s be There and and acoustic top 4.3 guitar or be. And Most or for a billet, one by lesser than.",
    //   brand_name: "Martin",
    //   price: "1649.0",
    //   rating: 5,
    //   image_url: "https://media.musiciansfriend.com/is/image/MMGS7/Special-Grand-Performance-Cutaway-15ME-Streetmaster-Style-Acoustic-Electric-Guitar-Natural/L40683000001000-00-220x220.jpg",
    //   category: "Acoustic-Electric Guitar"
    // });
    // console.log("Guitar Updated: ", updateGuitars);
    // const all = await getGuitars()
    // console.log("All Guitars:", all)
    //? get guiatr id 
    // const guitarIds = await getGuitarById(1);
    // console.log(guitarIds)

    // Create Cart 
    // const cart = await getCart();
    // console.log(cart)
     

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

    //? Delete user by id
    // const user = await deleteUserById(8);
    // console.log(`User got deleted ${user}`)
    //? Claer the cart
    // const ClearCart = await clearCart(1);
    // console.log("Clear Cart, Result:", ClearCart)

    //? Remove order from cart
    // const removeOrder = await removeOrderCart(1,1);
    // console.log("Remove guitar From Cart, Result:", removeOrder)


    // create cart
    // const getCart = await createCart({userId : 1});
    // console.log("All cart, Result:", getCart)

   //? User cart by id
    // const userCart = await getCartById(1);
    // console.log("User cart by id:", userCart)

    // ? All cart item by id
    // const testThat = await getAllartItemById(1)
    // console.log("All cart item by" , testThat)

    //get All the cart item
    // const cartItem = await getCartItem()
    // console.log("All cart item: ", cartItem)
// const x = await resetPassword(1,'ssx')
// console.log('reset password' , x)
    //? update  cart item 
    // const updateCart = await updateCartItem(1,{
    //   cart_id : 1, guitar_id  : 1
    // })
    // console.log("Updated cart item: ", updateCart)
    //? Add to cart
    // const addToShppingCart = await addToCart({cartId : 1, guitarId : 1, quantity : 1});
    // console.log("Add guiatr to cart, Result:", addToShppingCart)
    
    //? Get the joining table :
    // const joining = await getTheJoiningTable()
    // console.log("Joining table:", joining);

    // ? Get Message:
    // const msg = await getConversations()
    // console.log('Messages', msg)

    // ? Get Message by id:
    const msg = await getConversationById(1)
    console.log('Message id', msg)
    
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
    await createInitialUsers();
    await createInitialGuitars();
    await createInitialCart();
    await createInitialCart_item();
     await createInitialMsg();
  } catch (error) {
    throw error;
  };
};

// ================= Ending Databe =================
rebuildDB()
  .then(testDB)
  .catch(console.error)
  .finally(() => client.end());