
import axios from 'axios';

export async function addToCart(item, cartGuitar) {    
    const found = cartGuitar.filter((cart) => cart.id === item.id)
    if (!found.length){
        const response = await axios({
          method: 'POST',
          url: 'http://localhost:8000/cart',
          data: {
            'guitarId': item.id
          },
          headers: {
            'Content-Type': 'application/json'
          }
        })

     console.log(response.data)
    } else {
      return
    }
  };