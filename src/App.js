import React, { Component } from 'react';
import './App.css';
import axios from "axios";
import Qs from "qs";

import Search from './components/search/Search';
import Results from './components/results/Results';
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { Carousel } from 'react-responsive-carousel';
import styles from "react-responsive-carousel/lib/styles/carousel.min.css";

library.add(faSearch);


class App extends Component {
  constructor() {
    super();

    this.state = {
      searchInput: "",
      searchResults: {},
      deals: {}
    };
  }

  componentDidMount = () => {
    axios({
      url: "https://proxy.hackeryou.com",
      method: "GET",
      dataResponse: "json",
      paramsSerializer: function (params) {
        return Qs.stringify(params, { arrayFormat: "brackets" });
      },
      params: {
        reqUrl:
          "http://api.walmartlabs.com/v1/search",
        params: {
          apiKey: "y3xen4j3dtzbq4n7snepx8h3",
          query: 'sale'
        },
        proxyHeaders: {
          headers_params: "value"
        },
        xmlToJSON: false
      }
    }).then(res => {
      console.log(res.data);
      this.setState({
        deals: res.data
      })
    });
  }

  searchInput = (e) => {
    this.setState({
      searchInput: e.currentTarget.value
    });
  };

  searchSubmit = (e) => {
    e.preventDefault();
    this.getSearch(this.state.searchInput);
  }

  getSearch = (query) => {
    axios({
      url: "https://proxy.hackeryou.com",
      method: "GET",
      dataResponse: "json",
      paramsSerializer: function(params) {
        return Qs.stringify(params, { arrayFormat: "brackets" });
      },
      params: {
        reqUrl:
          "http://api.walmartlabs.com/v1/search",
        params: {
          apiKey: "y3xen4j3dtzbq4n7snepx8h3",
          query: query
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
      }, () => {
        const productDetails = this.state.searchInput;

        this.props.history.push({ pathname: `/resultsPage/${productDetails}`, state: { data: res.data.items}});
      })
    });
  }

  render() {
    return (
      <div className="App">
        <Search 
          search={this.searchInput}
          searchSubmit={this.searchSubmit} 
        />
        <img src="../images/pickUpImg.jpg" alt="pick up images" className='pickUpImage'/>
        <div className="carousel">
          <Carousel
            autoPlay={true}
            infiniteLoop={true}
            interval={3000}
            showStatus={false}
            showThumbs={false}>
            <div>
              <img src="../images/carousel01.jpg" alt="delivery or free pickup"/>
            </div>
            <div>
              <img src="../images/carousel02.jpg" alt="play the day away in the pool" />
            </div>
            <div>
              <img src="../images/carousel03.jpg" alt="get moving this summer" />
            </div>
          </Carousel>
        </div>
        <h1>Deals of the Day</h1>
        <Results
          data={this.state.deals.items}
        />
      </div>
    );
  }
}

export default App;
