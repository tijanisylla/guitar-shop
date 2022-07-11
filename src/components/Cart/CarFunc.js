
import axios from 'axios';
import {ToastContainer, toast} from 'react-toastify';




// const onAddItem = (product) => {
//   const exist  = cartItem.find(item => item.id === product.id);
//   if(exist) {
//     setCartItem(product.map(x => x.id === product.id ? {...exist, qty : exist.qty + 1} : x ))
//   }else{
//     setCartItem([...cartItem, {...product, qty : 1}])
//   }
  // }

// export async function addToCart(product, cartGuitar, cartItem, setCartItem) {    
//   const exist  = cartItem.filter(item => item.id === product.id);
//   if(!exist.length){
//         const response = await axios({
//           method: 'POST',
//           url: 'http://localhost:8000/cart',
//           data: {
            
//             'guitarId': product.id
//           },
//           headers: {
//             'Content-Type': 'application/json'
//           }
//         })
//         toast.success(` added to the cart.`);
//         item.quantity = 1
//         setCartGames([...cartGames, item])
//     } else {
//       return
//     }
//   };
//   // === + ===
//   export async function increaseQuant(item, cart, quant, setQuant) {
    
//       try {
//         await axios({
//             method: 'PATCH',
//             url: `/api/order_games/${cart.id}`,
//             data: {
//               'guitarId': item.id,
//               'quantity': quant + 1,
//             },
//             headers: {
//               'Content-Type': 'application/json'
//             }
//         })
//       } catch (error) {
//         throw error
//       }
//     setQuant(quant + 1)
//   }
  
//   // === + ===
//   export async function decreaseQuant(item, cart, quant, setQuant) {
   
//       try {
//         await axios({
//             method: 'PATCH',
//             url: `http://localhost:8000/cart/${cart.id}`,
//             data: {
//               'guitarId': item.id,
//               'quantity': quant - 1,
//             },
//             headers: {
//               'Content-Type': 'application/json'
//             }
//         })
//       } catch (error) {
//         throw error
//       }

//     setQuant(quant + 1)
//   }


  // === Total ===
  export async function calcTotal(item) {
    const cartQuants = item.map(item => parseFloat(item.quantity))
    const cartPrices = item.map(item => parseFloat(item.price))
  
    let runningTotal = 0
  
    for (let i = 0; i < cartPrices.length; i++) {
      runningTotal = runningTotal + (cartPrices[i] * cartQuants[i])
    }
  
    return runningTotal
  }