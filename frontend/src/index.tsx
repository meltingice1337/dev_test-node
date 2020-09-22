import React from 'react';
import ReactDOM from 'react-dom';

import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { toast } from 'react-toastify';

import { AuthenticationProvider } from '@contexts/AuthenticationContext';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';

import '../public/styles/main.scss';

toast.configure();

ReactDOM.render(
    <BrowserRouter>
        <AuthenticationProvider>
            <App />
        </AuthenticationProvider>
    </BrowserRouter>,
    document.getElementById('root')
);