import { combineReducers } from "redux";
import authState from './authState';
import profile from './profile';

const appReducers = combineReducers({
    authState,
    profile,
})
export default appReducers
