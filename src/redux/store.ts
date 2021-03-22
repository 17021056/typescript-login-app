import { createStore, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import createSagaMiddleware  from 'redux-saga';
import appReducers from "./reducers";
const sagaMiddleware = createSagaMiddleware()
declare global {
    interface Window {
      __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
    }
}

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
    appReducers,   
    composeEnhancer(applyMiddleware(thunk),applyMiddleware(sagaMiddleware)),
)
    export default store