import { createStore, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import appReducers from "./reducers";

declare global {
    interface Window {
      __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
    }
}

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
    appReducers,   
    composeEnhancer(applyMiddleware(thunk)),
)
export default store