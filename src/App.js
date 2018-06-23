import React, { Component } from 'react';
import './App.css';
import axios from "axios";
import Qs from "qs";

import Search from './components/search/Search';

class App extends Component {
  constructor() {
    super();

    this.state = {
      searchInput: "",
    };
  }

  componentDidMount() {
    // axios({
    //   url: "https://proxy.hackeryou.com",
    //   method: "GET",
    //   dataResponse: "json",
    //   paramsSerializer: function(params) {
    //     return Qs.stringify(params, { arrayFormat: "brackets" });
    //   },
    //   params: {
    //     reqUrl:
    //       "http://api.walmartlabs.com/v1/search",
    //     params: {
    //       apiKey: "y3xen4j3dtzbq4n7snepx8h3",
    //       query: "ipod"
    //     },
    //     proxyHeaders: {
    //       headers_params: "value"
    //     },
    //     xmlToJSON: false
    //   }
    // }).then(res => {
    //   console.log(res.data);
    // });
  }

  searchInput = (e) => {
    console.log(e.currentTarget.value);
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
    });
  }

  render() {
    return (
      <div className="App">
        yoyoyo
        <Search 
          search={this.searchInput}
          searchSubmit={this.searchSubmit} />
      </div>
    );
  }
}

export default App;
