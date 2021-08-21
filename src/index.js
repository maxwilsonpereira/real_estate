import React from "react";
import ReactDOM from "react-dom";
import "./global.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";

// ********** REDUX ********** //
// npm install --save redux AND npm install --save react-redux
// compose allows the use of more enhancers together. In this case,
// to be abble to use ReduxDev Tools Chrome extension.
import { createStore, combineReducers, applyMiddleware, compose } from "redux";
// combineReducers is used to merge all reducers files into one.
// thunk is a Middleware, ready to go, that allows ASYNC CODE:
// npm i redux-thunk
import thunk from "redux-thunk";
import { Provider } from "react-redux";
// IMPORTING all the reducer files to combine in a unique REDUCER:
import globalReducer from "./store/reducers/global";
import loginReducer from "./store/reducers/login";
import apartamentosReducer from "./store/reducers/apartamentos";

// REDUX STORE:
// rootReducer will be the the "ONLY" reducer from this app:
const rootReducer = combineReducers({
  global: globalReducer,
  login: loginReducer,
  apartamentos: apartamentosReducer,
});

// composeEnhancers is to connect with the Redux DevTools Google Chrome Extension:
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunk))
  // composeEnhancers(applyMiddleware(thunk))
);

ReactDOM.render(
  <React.StrictMode>
    {/* <Provider store={store}> IS FRROM REDUX */}
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

serviceWorker.unregister();
