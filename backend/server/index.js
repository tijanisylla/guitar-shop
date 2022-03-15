const express = require('express');
const App = express();
const PORT = 8000;
// const chalk = require('chalk');
// console.log(chalk.blueB('Hello'));



//? Middle ware
App.use(express.json())

// Code goes here !




App.listen(PORT, () => {
  console.log(`App is running at port ${PORT}`)
})