import React, {useState} from 'react';

const DecRease = ({quantity}) => {
  const [quant,etQuant] = useState(quantity)

  return (
    <>
     <button  className="btn btn-primary btn-sm" size="sm">
     <i className="fa-solid fa-minus"></i>
         </button> 
    </>
  )
}

export default DecRease