import React from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Star = (props) => {
  let totalStars = [];
  for (let i=0; i < props.starNum; i++){
    totalStars.push(<FontAwesomeIcon icon="star" key={i}/>);
  }
  return <div className='stars'>{totalStars.map(star => {
    return star;
  })}</div>
}

export default Star;