import React from 'react';
import ReactDOM from 'react-dom';

import { BrowserRouter } from 'react-router-dom';
import App from './App';

import { AuthenticationProvider } from './context/AuthenticationContext';

import '../node_modules/bootstrap/dist/css/bootstrap.min.css';

import '../public/styles/main.scss';

ReactDOM.render(
    <BrowserRouter>
        <AuthenticationProvider>
            <App />
        </AuthenticationProvider>
    </BrowserRouter>,
    document.getElementById('root')
);