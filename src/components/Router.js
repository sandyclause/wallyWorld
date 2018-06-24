import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import App from '../App';
import ProductDetails from './productDetails/ProductDetails';
import ResultsPage from '../containers/resultsPage/ResultsPage';

const Router = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path='/' component={App} />
      <Route path='/resultsPage/:search' component={ResultsPage} />
      <Route path='/products/:itemId' component={ProductDetails} />
    </Switch>
  </BrowserRouter>
)

export default Router;