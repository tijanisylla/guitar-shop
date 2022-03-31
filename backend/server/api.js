// const express = require('express');
// const Router = express.Router();
<<<<<<< HEAD
// const getAllGuitars = require('../seed/guitars.json')


// Status code
// 200 means success
// 500 means something broke
// 404 means not found 


//     Router.get('/guitars', async (req, res) => {
//         const {
//           page,
//           perPage
//         } = req.query;
      
//         const guitars = await getAllGuitars({
//           limit : perPage,
//           offset : (page - 1) * perPage
//         });
       
      
//         if (guitars) {
//           res.status(200).send(guitars);
//         } else {
//           res.status(404).send({
//             message: 'Users not found',
//           })
//         }
//       });

=======
// const guitarsData = require('../seed/guitars.json')


// Router.get('/', async (req, res, next) => {
// res.status(200).send(guitarsData);
// console.log('Got response!')
// });
>>>>>>> 6cdc270f20e5711faf5bb9bb50983bbffeba09f2

// module.exports = {
//     Router
// }

<<<<<<< HEAD
=======
// Status code
// 200 means success
// 500 means something broke
// 404 means not found 
>>>>>>> 6cdc270f20e5711faf5bb9bb50983bbffeba09f2
