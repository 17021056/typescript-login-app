import { API_URL_HEROKU } from '../constants/config'
import AxiosService from '../config/AxiosService';
import {  rawSignUpType} from  '../constants/dataType'


export const postSignUpApp = (rawSignUp:rawSignUpType) => {
    const config = { 
        url: `${API_URL_HEROKU}/users`,
        method: 'POST',
        headers: { 
            'Content-Type': 'application/json'
          },
        data : JSON.stringify(rawSignUp)
    }
    return AxiosService.postRequest(config)
}