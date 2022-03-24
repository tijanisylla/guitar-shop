const express = require('express');
const app = express();
const morgan = require('morgan');
const cors = require('cors');
const PORT = 8000;
const {getAllUsers, getAllGuitars} = require('../db/index');
const {client} = require('../db/index');
client.connect();

// Middle Ware
app.use(morgan('dev'));
app.use(express.json());
app.use(cors());

// Users
app.get('/users', async(req, res) => {
  const users = await getAllUsers();
  res.send(users);
  console.log('Got users!')
});

// Guitars
app.get('/guitars', async(req, res) => {
  const guitars = await getAllGuitars();
  res.send(guitars);
  console.log('Got guitars!')
});


// app listenig
app.listen(PORT, () => {
  console.log(`App is listening on port ${PORT}`)
})