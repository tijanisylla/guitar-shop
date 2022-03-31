const express = require('express');
const app = express();
const morgan = require('morgan');
const cors = require('cors');
const PORT = 8000;
const {
  getAllUsers,
  getAllGuitars,
  getGuitarById
} = require('../db/index');
const {
  client
} = require('../db/index');
client.connect();

// Middle Ware
app.use(morgan('dev'));
app.use(express.json());
app.use(cors());

// ===========Users===========
app.get('/users', async (req, res) => {
  const users = await getAllUsers();
  res.send(users);
  console.log('Got users!')
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
  if (guitars) {
    res.status(200).send(guitars);
  } else {
    res.status(404).send({
      message: 'Guitars not found',
    })
  }
});


// =========== guitars : id ===========
app.get('/guitars/:id', async (req, res) => {
const {id} = req.params
const guitarId = await getGuitarById(id);

if (guitarId) {
  res.status(200).send(guitarId);
} else {
  res.status(404).send({
    message: 'guitar id not found',
  })
}
})


// Login/admin

// Login/users

// Resgister

// Checkout

// Order Guitar

// As admin CRUD users

// CRUD guiatrs as an Admin

// Get Payment info 




// =========== App && Port ===========
app.listen(PORT, () => {
  console.log(`App is listening on port ${PORT}`)
})