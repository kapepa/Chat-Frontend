import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { BrowserRouter as Router } from "react-router-dom";
import 'antd/dist/antd.css';
import 'emoji-mart/css/emoji-mart.css';
import './styles/index.scss';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import rootReducer from '../src/redus/reducers/index';
import { authActions } from './redus/action/index';

const store = createStore(rootReducer);
const token = localStorage.getItem(document.location.origin);

if(token) authActions.establishAuth(store.dispatch).loadPage(token)

ReactDOM.render(<Router><Provider store={store}><App/></Provider></Router>, document.getElementById('root'))



