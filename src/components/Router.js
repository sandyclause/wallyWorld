import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import App from '../App';
import ProductDetails from './productDetails/ProductDetails';
import Results from './results/Results';

const Router = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path='/' component={App} />
      <Route path='/searchResults/:search' component={Results} />
      <Route path='/products/:itemId' component={ProductDetails} />
    </Switch>
  </BrowserRouter>
)

export default Router;