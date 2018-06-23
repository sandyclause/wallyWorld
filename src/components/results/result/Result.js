import React from 'react';
import classes from './Result.css';

class Result extends React.Component{

  render(){
    return(
      <div className='productCard'>
        <div className="imgContainer">
          <img src={this.props.img} alt={this.props.name}/>
        </div>
        <div className='descriptionContainer'>
          <p>{this.props.name}</p>
          <p><span>$</span>{this.props.salePrice}</p>
          <p><span>About this item:</span> {this.props.desc}</p>
          <p><span>UPC:</span> {this.props.upc}</p>
        </div>
      </div>
    )
  }
}

export default Result;

