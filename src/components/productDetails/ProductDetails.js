import React from 'react';
import axios from "axios";
import Qs from "qs";
import renderHTML from "react-render-html";

class ProductDetails extends React.Component {
  constructor(){
    super();

    this.state = {
      searchResults: {}
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
      console.log(res.data);
      this.setState({ 
        searchResults: res.data 
      });
    });
  }


  render() {
    const decode = require('decode-html');
    const longDesc = this.state.searchResults.longDescription !== undefined ? renderHTML(decode(this.state.searchResults.longDescription)) : null;

    return <React.Fragment>
        <p>product details</p>
        <img src={this.state.searchResults.largeImage} alt={this.state.searchResults.name} />
        <p>{this.props.match.params.itemId}</p>
        <p>{this.state.searchResults.name}</p>
        <p>{this.state.searchResults.salePrice}</p>
        <p>{this.state.searchResults.shortDescription}</p>
        {longDesc}
      </React.Fragment>;
  }
}

export default ProductDetails;

