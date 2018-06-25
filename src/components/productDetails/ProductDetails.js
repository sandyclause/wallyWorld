import React from 'react';
import axios from "axios";
import Qs from "qs";
import renderHTML from "react-render-html";

import { reduceParagraph } from '../../helpers';
import classes from './ProductDetails.css';
import Result from '../results/result/Result';
import { Carousel } from "react-responsive-carousel";
import styles from "react-responsive-carousel/lib/styles/carousel.min.css";

class ProductDetails extends React.Component {
  constructor(){
    super();

    this.state = {
      searchResults: {
        imageEntities: []
      },
      variationsArray: []
    }
  }

  componentDidMount(){
    axios({
      url: "https://proxy.hackeryou.com",
      method: "GET",
      dataResponse: "json",
      paramsSerializer: function(params) {
        return Qs.stringify(params, { arrayFormat: "brackets" });
      },
      params: {
        reqUrl: `http://api.walmartlabs.com/v1/items/${
          this.props.match.params.itemId
        }`,
        params: {
          apiKey: "y3xen4j3dtzbq4n7snepx8h3"
         },
        proxyHeaders: {
          headers_params: "value"
        },
        xmlToJSON: false
      }
    }).then(res => {
      // console.log(res.data);

      //calls all the variants
      this.multiCall(res.data.variants);

      this.setState({ 
        searchResults: res.data 
      });
    });
  };

  multiCall = (variArray) => {
    variArray.map( vari => {
      this.getVariations(vari);
    })
  }

  getVariations = (params) => {
    axios({
      url: "https://proxy.hackeryou.com",
      method: "GET",
      dataResponse: "json",
      paramsSerializer: function (params) {
        return Qs.stringify(params, { arrayFormat: "brackets" });
      },
      params: {
        reqUrl: `http://api.walmartlabs.com/v1/items/${
          params
          }`,
        params: {
          apiKey: "y3xen4j3dtzbq4n7snepx8h3"
        },
        proxyHeaders: {
          headers_params: "value"
        },
        xmlToJSON: false
      }
    }).then(res => {

      const variationsArrayClone = [...this.state.variationsArray];
      variationsArrayClone.push(res.data);
      this.setState({
        variationsArray: variationsArrayClone
      })

    });
  }


  render() {
    const decode = require('decode-html');
    const longDesc = this.state.searchResults.longDescription !== undefined ? renderHTML(decode(this.state.searchResults.longDescription)) : null;

    const shortDesc = this.state.searchResults.shortDescription !== undefined ?
    reduceParagraph(this.state.searchResults.shortDescription, 400) : null;

    const name = this.state.searchResults.name;
    const largeImg = this.state.searchResults.largeImage;
    const ratingImg = this.state.searchResults.customerRatingImage;
    const ratingNum = this.state.searchResults.numReviews
    const itemId = this.state.searchResults.itemId;

    const salePrice = this.state.searchResults.msrp ? <p className='salePrice onSale'>
      <span>$</span>
      {this.state.searchResults.salePrice}
    </p> : <p className='salePrice'>
        <span>$</span>
        {this.state.searchResults.salePrice}
      </p>

    const msrp = this.state.searchResults.msrp ? <p className="msrpPrice">
        <span>$</span>
        {this.state.searchResults.msrp}
      </p> : null;

    const variationsArray = this.state.variationsArray !== undefined ? this.state.variationsArray.map(variation => {
      return (
        <Result
          key={variation.itemId}
          itemId={variation.itemId}
          name={variation.name}
          salePrice={variation.salePrice}
          msrp={variation.msrp}
          img={variation.largeImage}
        />
      )
      }) : <p>loading</p>;


    const imageEntities = this.state.searchResults.imageEntities[0] ? this.state.searchResults.imageEntities.map( (image, index) => {
        return (
        <div key={index}>
          <img src={image.largeImage} />
        </div>
        )
    }) : null;

 


    return <React.Fragment>
        <div className="productSectionContainer">
          <div className="wrapper">
            <div className="productImgContainer">
              {/* <img src={largeImg} alt={name} /> */}
              <Carousel>{imageEntities}</Carousel>

              
            </div>
            <div className="productInfoContainer">
              <p className="productTitle">{name}</p>
              <div className="reviewsContainer">
                <img src={ratingImg} alt={name} />
                <p>{ratingNum} reviews</p>
              </div>
              <div className="priceContainer">
                {salePrice}
                {msrp}
              </div>
              <p>Walmart #{itemId}</p>
            </div>
            <div className="aboutDetailsContainer">
              <p className="aboutDetailsTitle">About This Item</p>
              <div className="aboutDetails">
                <div className="shortDesc">{shortDesc}</div>
                <div className="longDesc">{longDesc}</div>
              </div>
            </div>
            <div>
              <p>Customers also considered: COMING SOON</p>
              {variationsArray}
            </div>
          </div>
        </div>
      </React.Fragment>;
  }
}

export default ProductDetails;

