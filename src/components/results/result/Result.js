import React from 'react';
import classes from './Result.css';
import renderHTML from 'react-render-html';

import { withRouter } from 'react-router-dom';

class Result extends React.Component{

  goToDetails = (e) => {
    e.preventDefault();
    console.log(this.props.itemId);
    const productDetails = this.props.itemId;
    this.props.history.push(`/productDetails/${productDetails}`)
  }

  render(){
    const decode = require('decode-html');

    return(
      <div className='productCard' onClick={this.goToDetails}>
        <div className="imgContainer">
          <img src={this.props.img} alt={this.props.name}/>
        </div>
        <div className='descriptionContainer'>
          <p>{this.props.name}</p>
          <p><span>$</span>{this.props.salePrice}</p>
          <p><span>About this item:</span> {this.props.desc}</p>
          <p><span>UPC:</span> {this.props.upc}</p>
          {renderHTML(decode(this.props.long))}
        </div>
      </div>
    )
  }
}

export default withRouter(Result);

