import { combineReducers } from "redux";
import authState from './authState';
import profile from './profile';
import loadingscreen from './loadingscreen';
import message from "./messege";


const appReducers = combineReducers({
    authState,
    profile,
    loadingscreen,
    message
})
export default appReducers
