// const express = require('express');
// const Router = express.Router();
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


// module.exports = {
//     Router
// }


