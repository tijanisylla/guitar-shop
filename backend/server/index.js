const express = require('express');
const app = express();
const morgan = require('morgan');
const cors = require('cors');
const PORT = 8000;
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
const JWT_SECRET = 'shhhhh never tell them!!!';
const nodemailer = require('nodemailer');
const cloudinary = require('cloudinary');
const fileupload = require('express-fileupload'); 


const {
  google
} = require('googleapis')
require('dotenv').config();
const path = require('path');
;

const {
  getAllUsers,
  getAllGuitars,
  getGuitarById,
  createGuitar,
  getUser,
  getUserByUsername,
  createUsers,
  getUserQeury,
  deleteUserById,
  deleteGuitarById,
  updateGuitar,
  deactivateUser,
  activateUser

} = require('../db/index');
const {
  client
} = require('../db/index');
const {
  addToCart,
  clearCart,
  removeOrderCart,
  getCartItem,
  getGuitars,
  getAllartItemById,
  updateCartItem
} = require('../db/Cart')

const {
    getCart,
    createCart,
    getCartById,
    getCartUserById,
    updateCart,
    deleteCart
} = require('../db/Order')
client.connect();

// Middle Ware
// create application/json parser
app.use(bodyParser.urlencoded({
  extended: false
}))

app.use(morgan('dev'));
app.use(express.json({ limit: '50mb' }));
app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));
app.use(fileupload({useTempFiles: true}))

cloudinary.config({
  cloud_name : 'dybw47o3m',
  api_key : '147717723366494',
  api_secret : 'pnSjVJgidSwEyANVUuXcW8H9vfQ'
  // apiEnv : 'CLOUDINARY_URL=cloudinary://147717723366494:pnSjVJgidSwEyANVUuXcW8H9vfQ@dybw47o3m'
})

app.post('/upload', async (req, res) => {
  try{
    const file = req.files.image
    const repsonse = await cloudinary.uploader.upload(file.tempFilePath, {
    upload_preset : 'dev_setup'
    })
    console.log(repsonse)
    res.json({message : 'Yayy!'})
  }catch(err){
    console.error(err)
    res.status(500).json({err : 'Something went wrong'})
  }


})
// ===========Users===========
app.get('/users', async (req, res) => {
  const users = await getAllUsers();
  if (!users) {
    res.status(404).send({
      message: 'User not found'
    })
  } else {
    res.status(200).send(users);
    console.log('Got users!')
  }
});

// ===========Users===========
app.get('/users/search', async (req, res) => {
  const {
    name
  } = req.query
  const users = await getUserQeury(name);
  if (!users) {
    res.status(404).send({
      message: 'User not found'
    })
  } else {
    res.status(200).send(users);
    console.log('NICE')
  }
});


// ===========Guitars===========
app.get('/guitars', async (req, res) => {
  const {
    page,
    perPage,
    search
  } = req.query;

  const guitars = await getAllGuitars({
    limit: parseInt(perPage),
    offset: parseInt(page - 1) * perPage,
    totalPages: Math.ceil(page / perPage),
    search

  });
  if (!guitars) {
    res.status(404).send({
      message: 'Guitars not found',
    })
  } else {
    res.status(200).send(guitars);
  }
});


// =========== Guitars : id ===========
app.get('/guitarsAll/:id', async (req, res) => {
  const {
    id
  } = req.params
  const guitarId = await getGuitarById(id);

  if (!guitarId) {
    res.status(404).send({
      message: 'Guitar  not found',
    })
  } else {
    res.status(200).send(guitarId);
  }
});

// =========== All Guitars ===========
app.get('/guitarsall', async (req, res) => {
  const guitars = await getGuitars();
  if (!guitars) {
    res.status(404).send({
      message: 'Guitars not found'
    })
  } else {
    res.status(200).send(guitars);
    console.log('Got guitars!')
  }
});
// =========== Online ===========
app.patch('/online/:id', async (req,res) => {
const { id } = req.params
  try{
    const onlineUser = await activateUser(id)
    
    res.status(200).send(onlineUser)
    const result =  onlineUser.map((user) => user.username)
    console.log(`${result} ===== IS NOW ONLINE`)
  }catch(error){
    res.status(error).send({message : 'An error has occured during ONLINE request :('})
  }
}) 

// =========== Offline ===========
app.patch('/offline/:id', async (req,res) => {
const { id } = req.params
  try{
    const offlineUser = await deactivateUser(id)
    if(!offlineUser){
      res.status(404).send({message : 'This does not exist.'})
    }else{
      res.status(200).send(offlineUser)
      const result =  offlineUser.map((user) => user.username)
      console.log(`${result}  ===== IS NOW OFFLINE`)
    }
    
  }catch(error){
    res.status(error).send({message : 'NOP!'})
  }
});



// =========== Update Guitars ===========
app.patch('/guitarsAll/:id', async (req, res) => {
  const {
    id
  } = req.params;
  const {
    model_name,
    description,
    brand_name,
    price,
    rating,
    image_url,
    category
  } = req.body;

  const guitar = await updateGuitar(id, req.body);
  if (!guitar) {
    res.status(404).send('No guitar got updated')
  } else {
    res.status(200).send(`Guitar got updated successfully ${guitar}`)
  }
});

app.delete('/guitarsAll/:id', async (req, res) => {
  const {
    id
  } = req.params;
  const guitar = await deleteGuitarById(id);
  if (!guitar) {
    res.status(404).send('No guitar got deleted')
  } else {
    res.status(200).send(`guitar got deleted successfully ${guitar}`)
    console.log('Guitar deleted :', guitar)
  }
});
//========================= Create a guitar =========================
app.post('/guitars-create', async (req, res, next) => {

  const {
    model_name,
    description,
    brand_name,
    price,
    rating,
    image_url,
    category
  } = req.body;

  try {
    
    const newImg = await cloudinary.uploader.upload(image_url, {
    upload_preset : 'dev_setup'
    })
    const newGuitar = await createGuitar({
      model_name,
      description,
      brand_name,
      price,
      rating,
      newImg,
      category
    });
    
    if (!newGuitar) {
      res.status(404).send({
        message: 'Guitar does not exist!',
      })
    } else {
      res.status(200).send('Guitar Created!' + newGuitar)
      console.log('IMAGE PATH!' + newImg)
    }
  } catch (err) {
    throw err
  }
});

//========================= Register/users =========================
app.post('/users/register', async (req, res, next) => {
  const {
    username,
    password
  } = req.body;
  try {
    // If username already exist from the data base
    const queriedUser = await getUserByUsername(username)
    if (queriedUser) {
      res.status(401).send({
        message: 'A user by that username already exists',
      })
    }

    // The role here By default is going to be User
    const role = "user"
    const newUser = await createUsers({
      username,
      password,
      role
    })

    console.log(`NEW USER ROLE : ${newUser.role}`)

    if (!newUser || !newUser.role) {
      res.status(404).send({
        message: 'There was a problem registering you. Please try again.',
      })
    } else {
      const token = jwt.sign(
        newUser,
        JWT_SECRET, {
          expiresIn: '1w'
        }
      )
      res.send({
        newUser,
        message: "you're signed up!",
        token
      })
      const recoverData = jwt.verify(token, JWT_SECRET)
      console.log(newUser, recoverData)
    };
  } catch (error) {
    throw error
  };
});
// delete user by id 
app.delete('/users/:id', async (req, res) => {
  const {
    id
  } = req.params;
  const user = await deleteUserById(id);
  if (!user) {
    res.status(404).send('No user got deleted')
  } else {
    res.status(200).send(`User got deleted successfully ${user}`)
  }
});
//========================= Login/users =========================

app.post('/users/login', async (req, res, next) => {
  const {
    username,
    password,
    date
  } = req.body

  if (!username || !password) {
    res.status(400).send({
      message: 'Please supply both a username and password'
    })
  }

  try {
    const date = new Date();
    const user = await getUser({
      username,
      password,
      date

    })
    console.log(`EXISTING USER ROLE : ${user.date}`)
    if (!user || !password) {
      user.role = null
      console.log('UNDEFINED')
      return res.status(400).send({
        name: 'InvalidCredentialsError',
        message: 'Username or password were incorrect'
      });
    } else {
      const token = jwt.sign(
        user,
        JWT_SECRET, {
          expiresIn: '1w'
        }
      )
      res.send({
        user,
        message: "you're logged in!",
        token
      })
    }
  } catch (error) {
    console.log(error)
    next(error)
  }

});
// =========== CART ===========
// get the cart


// clearCart,
// updateQuant,
// getCart

// getCartItem,
app.get('/cart', async (req, res) => {
  const Cart = await getCartItem();
  if (!Cart) {
    res.status(404).send({
      message: 'Cart not found'
    })
  } else {
    res.status(200).send(Cart);
   
  }
});

// addToCart item
app.post('/cart', async(req, res) => {
try{
  const cart_id = req.cart_id;
  const { guitarId,quantity,purchcost}= req.body
  const cartAdded = await addToCart({...req.body, cart_id});
  res.send(cartAdded) 
  console.log('--zap---', req.body)
}catch(error){
  throw error;
}
})

// Get all cart by id
app.get('/cart/:cartId', async(req, res, next) => {
  try {
    const {cartId} = req.params
    const cartIdAll = await getAllartItemById(cartId);
    res.send(cartIdAll)
  } catch (error) {
    next(error)
  }
});

// Remove from cart item
app.delete('/cart/:cartId', async(req, res) => {
    const {cartId} = req.params
    const {guitarId} = req.body
    const cartDeleted = await removeOrderCart(cartId,guitarId);
    res.status(200).send(cartDeleted) 
    console.log('--Item cart got removed---', cartId)

  })

// Update Cart item
app.patch('/cart/:id', async(req, res) => {
  const {id} = req.params
  const {cartId, guitarId} = req.body;
  try {
    const updatedOrder = await updateCartItem(id,req.body)
    res.send(updatedOrder)
  } catch (error) {
   throw error
  }
});
// Checkout

// Order Guitar

// Get Payment info 

// Contact Using NodeMailer
const CLIENT_ID = '312223310860-n7vfpbo4h6ghu6tk2m4mmn4nc9u1n911.apps.googleusercontent.com'
const CLIENT_SECRET = 'OkN-p94KwIxsR9q24LWPvKk9'
const REDIRECT_URI = 'https://developers.google.com/oauthplayground'
const REFRESH_TOKEN = '1//04KTQKVqUYqifCgYIARAAGAQSNwF-L9IrHkGKASus9Tv4HT5Ij7yT6mCba2xCSbtv4kpGDJ66UT8a36javxdk4NfY4pEizLJs_6g'
const oAuth2Client = new google.auth.OAuth2(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI)
oAuth2Client.setCredentials({
  refresh_token: REFRESH_TOKEN
})



const accessToken = oAuth2Client.getAccessToken()
let transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {

    type: 'oauth2',
    user: process.env.MY_EMAIL,
    pass: process.env.MY_PASS,
    clientId: CLIENT_ID,
    clientSecret: CLIENT_SECRET,
    refreshToken: REFRESH_TOKEN,
    accessToken: accessToken

  },
});
transporter.verify((err, success) => {
  // err
  //   ? console.log(err)
  //   : console.log(`=== Server is ready to take messages: ${success} ===`);
});

app.post("/send", function (req, res) {
  console.log(` STARTING TO SEND : ${JSON.stringify(req.body)}`)
  let mailOptions = {
    from: `${req.body.mailerState.email}`,
    to: process.env.MY_EMAIL,
    subject: `Message from: ${req.body.mailerState.email}`,
    text: `${req.body.mailerState.message}`,
  };

  transporter.sendMail(mailOptions, function (err, data) {
    if (err) {
      console.log(`FAILED TO SEND MAIL ${JSON.stringify(err)}`)
      console.error(err)
      res.json({
        status: "fail",
      });
    } else {
      console.log("== Message Sent ==");
      res.json({
        status: "success",
      });
    }
  });
});


// =========== App && Port ===========
app.listen(PORT, () => {
  console.log(`App is listening on port ${PORT}`)
});