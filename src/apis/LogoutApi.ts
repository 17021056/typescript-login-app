import { API_URL_HEROKU } from '../constants/config'
import AxiosService from '../config/AxiosService';

export const postLogoutApp = (token: string) => {
    const config = { 
        url: `${API_URL_HEROKU}/users/me/logout`,
        method: 'POST',
        headers: { 
            'Authorization': `Bearer ${token}`
        }
    }
    return AxiosService.postRequest(config)
}