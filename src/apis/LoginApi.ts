import { API_URL_HEROKU } from '../constants/config'
import AxiosService from '../config/AxiosService';
import {dataType} from '../constants/dataType';

export const postLoginApp = (data:dataType) => {
    return AxiosService.post(`${API_URL_HEROKU}/users/login`,data)
}