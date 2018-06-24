import React from 'react';
import classes from './Result.css';
import { withRouter } from 'react-router-dom';
import { reduceParagraph } from '../../../helpers';

class Result extends React.Component{

  goToDetails = (e) => {
    e.preventDefault();
    console.log(this.props.itemId);
    const productDetails = this.props.itemId;
    this.props.history.push(`/products/${productDetails}`)
  }

  render(){
    const msrp = this.props.msrp ? <p className='msrpPrice'><span>$</span>{this.props.msrp}</p> : null;
    const salePrice = this.props.msrp ? <p className='salePrice onSale'>
      <span>$</span>
      {this.props.salePrice}
    </p> : <p className='salePrice'>
        <span>$</span>
        {this.props.salePrice}
      </p>
    return <div className="productCard" onClick={this.goToDetails}>
        <div className="imgContainer">
          <img src={this.props.img} alt={this.props.name} />
        </div>
        <div className="descriptionContainer">
          <p className='description'>{reduceParagraph(this.props.name, 100)}</p>
        </div>
        <div className="ratingContainer">
          <img src={this.props.ratingImg} alt={this.props.rating}/>
          <p>{this.props.ratingNum}</p>
        </div>
        <div className="priceContainer">
          {salePrice}
          {msrp}
        </div>
      </div>;
  }
}

export default withRouter(Result);

