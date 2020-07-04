import 'materialize-css/dist/css/materialize.min.css'
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reduxThunk from 'redux-thunk';

import App from './components/App';
import reducers from './reducers';

//Development helpers for making requests from browser console
import axios from 'axios';
window.axios = axios;


const store = createStore(reducers,{}, applyMiddleware(reduxThunk)); //return value, state, applymiddleware

ReactDOM.render(
    <Provider store = {store}><App /></Provider>, 
    document.getElementById('root')
);

