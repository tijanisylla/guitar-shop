const express = require('express');
const app = express();
const morgan = require('morgan');
const cors = require('cors');
const PORT = 8000;
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
const JWT_SECRET = 'shhhhh never tell them!!!';
const {
  getAllUsers,
  getAllGuitars,
  getGuitarById,
  getUser,
  getUserByUsername,
  createUsers,
  getAdmins,
  getAdminByUsername,
  getAdminUsernameAndPassword
} = require('../db/index');
const {
  client
} = require('../db/index');
client.connect();

// Middle Ware
// create application/json parser

app.use(bodyParser.urlencoded({ extended : false }))
app.use(morgan('dev'));
app.use(express.json());
app.use(cors());



// ===========Users===========
app.get('/users', async  (req, res) => {
  const users = await getAllUsers();
  if(!users){
    res.status(404).send({message  : 'User not found'})
  }else{
    res.status(200).send(users);
    console.log('Got users!')
  }
});

// ===========Admins===========
app.get('/admins', async  (req, res) => {
  const admin = await getAdmins();
  if(!admin){
    res.status(404).send({message  : 'Admin not found'})
  }else{
    res.status(200).send(admin);
    console.log('Got admins!')
  }
});

// ===========guitars===========
app.get('/guitars', async (req, res) => {
  const {
    page,
    perPage
  } = req.query;

  const guitars = await getAllGuitars({
    limit: parseInt(perPage),
    offset: parseInt(page - 1) * perPage,
    totalPages : Math.ceil(page / perPage)

  });
  if (!guitars) {
    res.status(404).send({
      message: 'Guitars not found',
    })
  } else {
    res.status(200).send(guitars);
  }
});


// =========== guitars : id ===========
app.get('/guitars/:id', async (req, res) => {
const {id} = req.params
const guitarId = await getGuitarById(id);

if (!guitarId) {
  res.status(404).send({
    message: 'Guitar  not found',
  })
} else {
  res.status(200).send(guitarId);
}
})

//========================= Register/users =========================
app.post('/users/register', async (req, res, next) =>  {
  const { username, password } = req.body;
 try{
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

      if (!newUser) {
        res.status(404).send({
          message: 'There was a problem registering you. Please try again.',
        })
      } else {
        const token = jwt.sign(
          newUser, 
          JWT_SECRET, 
          { expiresIn: '1w' }
        
        )
        res.send({ newUser, message: "you're signed up!", token })
        const recoverData = jwt.verify(token,JWT_SECRET)
        console.log(newUser, recoverData)
      };
 }catch (error) {
   throw error
 };
})

//========================= Login/users =========================

app.post('/users/login', async (req, res, next) =>  {
  const { username, password } = req.body

  if(!username || !password) {
  res.status(400).send({message: 'Please supply both a username and password'})
  }
  
  try {
    const user = await getUser({ username, password })
    console.log(`EXISTING USER ROLE : ${user.role}`)
    if (!user) {
      return res.status(400).send({
          name: 'InvalidCredentialsError',
          message: 'Username or password were incorrect'
      });
    } else {
      const token = jwt.sign(
        user,
        JWT_SECRET,
        { expiresIn: '1w' }
      )
      res.send({ user, message: "you're logged in!", token })
    }
  } catch (error) {
    console.log(error)
    next(error)
  }

})


// Checkout

// Order Guitar

// As admin CRUD users

// CRUD guiatrs as an Admin

// Get Payment info 




// =========== App && Port ===========
app.listen(PORT, () => {
  console.log(`App is listening on port ${PORT}`)
})