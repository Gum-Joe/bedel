// Polyfill
import 'babel-polyfill';
// Entry file for react
import React from 'react';
import { render } from 'react-dom';
import { Dashboard } from './dashboard.jsx';


render(<Dashboard />, document.getElementById('main'));
