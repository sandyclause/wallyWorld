import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import App from '../App';
import ProductDetails from './productDetails/ProductDetails';

const Router = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path='/' component={App} />
      <Route path='/productDetails/:itemId' component={ProductDetails} />
    </Switch>
  </BrowserRouter>
)

export default Router;