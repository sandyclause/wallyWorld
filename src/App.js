import React, { Component } from 'react';
import './App.css';
import axios from "axios";
import Qs from "qs";

import Search from './components/search/Search';
import Results from './components/results/Results';
import ProductDetails from "./components/productDetails/ProductDetails";
import ResultsPage from "./containers/resultsPage/ResultsPage";
import Home from './components/homePage/Home';
import history from './history';

import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { Router, Route, Switch } from "react-router-dom";

library.add(faSearch);


class App extends Component {
  constructor() {
    super();

    this.state = {
      searchInput: "",
      searchResults: {},
      searchResultsItems: {},
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
      // console.log(res.data);
      console.log('state set');
      this.setState({
        searchResults: res.data,
        searchResultsItems: res.data.items
      }, () => {
        console.log('pushed');
        const productDetails = this.state.searchInput;

        // this.props.history.push({ pathname: `/resultsPage/${productDetails}`, state: { data: res.data.items}});
        history.push(`/resultsPage/${productDetails}`);
      })
    });
  }

  render() {
    return <Router history={history}>
        <div className="App">
          {/* <Route path='/' render={props => <Search {...this.props} {...props} search={this.searchInput} searchSubmit={this.searchSubmit} />} /> */}
          <Search search={this.searchInput} searchSubmit={this.searchSubmit} />
        
          <Route exact path="/" render={props => <Home {...this.props} {...props} data={this.state.deals.items} />} />

          <Route path="/resultsPage/:search" render={props => <ResultsPage {...this.props} {...props} data={this.state.searchResultsItems} />} />
          <Route path="/products/:itemId" component={ProductDetails} />
        </div>
      </Router>;
  }
}

export default App;
