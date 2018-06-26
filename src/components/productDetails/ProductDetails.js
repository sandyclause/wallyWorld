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
  constructor(props){
    super(props);

    this.state = {
      itemId: this.props.match.params.itemId,
      searchResults: {
        imageEntities: []
      },
      variationsArray: [],
      imgEntities: []
    }
  }

  componentDidMount(){
   this.callProduct(this.state.itemId);
  };

  componentWillReceiveProps(newProps){
    console.log(newProps.match.params.itemId);
    this.callProduct(newProps.match.params.itemId);
  }

  callProduct = (itemId) => {
    axios({
      url: "https://proxy.hackeryou.com",
      method: "GET",
      dataResponse: "json",
      paramsSerializer: function (params) {
        return Qs.stringify(params, { arrayFormat: "brackets" });
      },
      params: {
        reqUrl: `http://api.walmartlabs.com/v1/items/${
          itemId
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

      this.setState({
        searchResults: res.data
      }, () => {
        this.getImgEntities(res.data.imageEntities, 5);
        if (res.data.variants !== undefined) {
          console.log(res.data.variants);
          this.multiCall(res.data.variants, 4);
        }
      });
    });
  }

  multiCall = (variArray, num) => {
    let newArray = [];

    for ( let i=0; i < variArray.length && i < num; i++){
      newArray.push(this.getVariations(variArray[i]))
    }
    Promise.all(newArray)
      .then(data => {
        console.log(data)
        this.setState({
          variationsArray: data
        })
    })
  }

  // multiCall = (variArray) => {
  //   const arrayOfVariationPromises = variArray.map(variationObject, index => this.getVariations(variationObject))
  //   Promise.all(arrayOfVariationPromises)
  //     .then(data => {
  //       console.log(data)
  //       this.setState({
  //         variationsArray: data
  //       })
  //     })
  // }

  getImgEntities = (array, num) => {
    let newImgArray = [...this.state.imgEntities];
    let setter = [];

    for ( let i=0; i < array.length && i < num; i++){
      setter.push(array[i].largeImage);
    }
    newImgArray = setter;
    this.setState({
      imgEntities: newImgArray
    })
  }

  getVariations = (params) => {
    return axios({
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
      return res.data;
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

    const variationsArray = this.state.variationsArray !== undefined ? this.state.variationsArray.map( (variation, index) => {
      return (
        <Result
          key={variation.itemId + variation.upc + index}
          itemId={variation.itemId}
          name={variation.name}
          salePrice={variation.salePrice}
          msrp={variation.msrp}
          img={variation.largeImage}
        />
      )
      }) : <p>loading</p>;

    const imagesArray = [...this.state.imgEntities];
    const imageEntities = this.state.imgEntities !== [] ? 
      imagesArray.reverse().map( (image, index) => {
        return (

          <div key={index}>
            <img src={image} />
          </div>
        )
    }) : null;

 


    return <React.Fragment>
        <div className="productSectionContainer">
          <div className="wrapper">
            <div className="productImgDescriptionContainer">
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
            </div>
            <div className="aboutDetailsContainer">
              <p className="aboutDetailsTitle">About This Item</p>
              <div className="aboutDetails">
                <div className="shortDesc">{shortDesc}</div>
                <div className="longDesc">{longDesc}</div>
              </div>
            </div>
            <div className='variationArrayContainer'>
              {variationsArray}
            </div>
          </div>
        </div>
      </React.Fragment>;
  }
}

export default ProductDetails;

