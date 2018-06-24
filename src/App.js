import React, { Component } from 'react';
import './App.css';
import axios from "axios";
import Qs from "qs";

import Search from './components/search/Search';
import Results from './components/results/Results';


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
        yoyoyo
        <Search 
          search={this.searchInput}
          searchSubmit={this.searchSubmit} 
        />
        <h1>Deals of the Day</h1>
        <Results
          data={this.state.deals.items}
        />
      </div>
    );
  }
}

export default App;
