const express = require('express');
const App = express();
const cors = require( 'cors' );
const PORT = 8000;
const {Router} = require('./api');

//? Middle ware
App.use(express.json())
App.use( cors() )

// Get All guiatrs
App.use('/guitars', Router)

App.listen(PORT, () => {
  console.log(`App is running at port ${PORT}`)
})