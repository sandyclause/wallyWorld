import React from 'react';
import { render } from "react-dom";
// import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import Router from './components/Router';

render(<Router />, document.getElementById('root'));
// registerServiceWorker();
