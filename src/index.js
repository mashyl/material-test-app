import React from 'react';
import ReactDOM from 'react-dom';
import 'fontsource-roboto';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { applyMiddleware, combineReducers, compose, createStore } from 'redux';
import { Provider } from "react-redux";
import {BrowserRouter} from 'react-router-dom';
import thunk from 'redux-thunk';

import usersReducer from './store/reducers/users_reducer';
import postsReducer from './store/reducers/posts_reducer';

const rootReducer = combineReducers({
    users: usersReducer,
    posts: postsReducer
})

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)));

ReactDOM.render(
  <Provider store={store}>
    <React.StrictMode>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </React.StrictMode>
  </Provider>,
  document.getElementById('root')
);

reportWebVitals();
