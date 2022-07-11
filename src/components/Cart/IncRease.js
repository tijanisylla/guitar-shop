import React,{useState} from 'react';
import axios from 'axios';

const Increase = ({cart}) => {
const {id,quantity} = cart

//     async function increaseQuant(item, quant,setQuant) {
    
//     try {
//       await axios({
//           method: 'PATCH',
//           url: `http://localhost:8000/cart/${id}`,
//           data: {
//             'guitar_id': item.id,
//             'quantity': quant + 1
//           },
//           headers: {
//             'Content-Type': 'application/json'
//           }
//       })
//     } catch (error) {
//       throw error
//     }
//     setQuant(quant + 1)

// }
const test = () => console.log('-========-' ,quantity + 1)

  return (
    <>
    <button 
      onClick={test}
      className="btn btn-primary btn-sm"
      size="sm">
    <i className="fa-solid fa-plus"></i>
    </button>                    
    </>
  )
}

export default Increase;

