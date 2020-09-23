import React from 'react';
import ReactDOM from 'react-dom';
import { toast } from 'react-toastify';
import { BrowserRouter } from 'react-router-dom';

import { Provider } from 'react-redux';
import { createStore } from 'redux';

import App from './App';

import { AuthenticationProvider } from '@contexts/AuthenticationContext';
import { HealthCheckProvider } from '@contexts/HealthCheckContext';
import { rootReducer } from './store/root-reducer';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';

import '../public/styles/main.scss';
import { LoadingProvider } from '@contexts/LoadingContext';

toast.configure();

const store = createStore(
    rootReducer,
    //@ts-ignore
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)

ReactDOM.render(
    <BrowserRouter>
        <LoadingProvider>
            <HealthCheckProvider>
                <Provider store={store}>
                    <AuthenticationProvider>
                        <App />
                    </AuthenticationProvider>
                </Provider>
            </HealthCheckProvider>
        </LoadingProvider>
    </BrowserRouter>,
    document.getElementById('root')
);