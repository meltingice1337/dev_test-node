import React from 'react';
import ReactDOM from 'react-dom';

import { BrowserRouter } from 'react-router-dom';
import App from './App';

import '../public/styles/main.scss';

ReactDOM.render(
    <BrowserRouter>
       <App/>
    </BrowserRouter>,
    document.getElementById('root')
);