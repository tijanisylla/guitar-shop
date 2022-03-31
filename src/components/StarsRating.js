import React from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";

// In this component I'am looping through how many stars and grabbing numberOfStars as a prop
const StarsRating = ({numberOfStars}) => {
  const stars = [];
  for (let idx = 0; idx < numberOfStars; idx++) {
    stars.push(
      <span
       style={{color : '#FFBF00'}}
       key={idx} >
      <FontAwesomeIcon icon={faStar} className="fa-star" /> 
      </span>
    ) 
  };
  return <span>{stars}</span>;

}

export default StarsRating;