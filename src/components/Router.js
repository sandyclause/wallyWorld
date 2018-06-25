import React from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom';
import App from '../App';
import ProductDetails from './productDetails/ProductDetails';
import ResultsPage from '../containers/resultsPage/ResultsPage';

const Router = () => (
  <HashRouter>
    <Switch>
      <Route exact path='/' component={App} />
      <Route path='/resultsPage/:search' component={ResultsPage} />
      <Route path='/products/:itemId' component={ProductDetails} />
    </Switch>
  </HashRouter>
)

export default Router;