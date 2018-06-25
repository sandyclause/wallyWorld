import React from 'react';
import { render } from "react-dom";
import './index.css';
import Router from './components/Router';

render(<Router basename={'/wallyworld'} />, document.getElementById('root'));

