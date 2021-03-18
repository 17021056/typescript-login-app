import axios from 'axios'
import * as Types from '../../constants/ActionTypes'
import { API_URL_HEROKU } from '../../constants/config'
import * as actions from '../../redux/actions/index'
import { rawType, rawSignUpType} from  '../../constants/dataType'
import {postLoginApp} from '../../apis/LoginApi';


export const increment = ()=>{
    return { type: Types.ADD}
}
//STOP_LOADING
export const stopLoading = () =>{
    return { type: Types.STOP_LOADING}
}
//START_LOADING
export const startLoading = () =>{
    return { type: Types.START_LOADING}
}
//NOTI_LOGIN_FAIL
export const notifyLoginFailure = () =>{
    return { type: Types.MESSAGE_LOGIN_FAILED}
}
//NOTI_SIGNUP_FAIL
export const notifySignupFailure = () =>{
    return { type: Types.MESSAGE_SIGNUP_FAILED}
}
//RESET_MESSAGE
export const resetMessage = () =>{
    return { type: Types.RESET_MESSAGE }
}
//LOGIN_APP
export const fetchLoginApp = (raw:rawType)=>{
    return (dispatch:any) =>{
        const data = {
            email:  raw.email,
            password: raw.password
        }
        return(
            // axios({
            //     method: 'POST',
            //     url: `${API_URL_HEROKU}/users/login`,
            //     data: data,
            // })
            postLoginApp(data)
            .then( res=>{
                if(res.status===200){
                    dispatch(actions.stopLoading())
                    dispatch(actions.loginApp())
                    if(raw.isremember===true){
                        console.log('oke')
                        dispatch(actions.saveTokenLocal(res.data.token))
                    }
                    else if(raw.isremember===false){
                        dispatch(actions.saveToken(res.data.token))
                    }
                }
            })
            .catch(err=>{
                dispatch(actions.notifyLoginFailure())
                dispatch(actions.stopLoading())
            })
        ) 
    }
}
export const loginApp = ()=>{
    return { type: Types.LOGIN_APP}
}
//SAVE_TOKEN
export const saveToken = (token:string)=>{
    return { type: Types.SAVE_TOKEN,token}
}
//KEEP LOGIN
export const saveTokenLocal = (token:string)=>{
    return { type: Types.SAVE_TOKEN_LOCAL,token}
}
//LOGOUT_APP
export const fetchLogoutApp = (token:string)=>{
    return (dispatch:any) =>{
        return(
            axios({
                method: 'POST',
                url: `${API_URL_HEROKU}/users/me/logout`,
                headers: { 
                    'Authorization': `Bearer ${token}`
                }
            })
            .then( res=>{
                if(res.status===200){
                    dispatch(actions.stopLoading())
                    dispatch(actions.logoutApp())                
                }
            })
            .catch(err=>{
                dispatch(actions.stopLoading())
            })
        ) 
    }
}

export const logoutApp = ()=>{
    return { type: Types.LOGOUT_APP}
}
//SIGNUP_APP
export const fetchSignUpApp = (rawSignUp:rawSignUpType,history:any)=>{
    return (dispatch:any) =>{
        return(
            axios({
                method: 'POST',
                url: `${API_URL_HEROKU}/users`,
                headers: { 
                    'Content-Type': 'application/json'
                  },
                data: JSON.stringify(rawSignUp)
            })
            .then( res=>{
                if(res.status===201){
                   dispatch(actions.stopLoading())
                   dispatch(signupApp(res.data.user.email))
                   history.push('/Login')                
                }
            })
            .catch(err=>{ 
                dispatch(actions.stopLoading())
                dispatch(actions.notifySignupFailure())
            })
        ) 
    }
}

export const signupApp = (username:string)=>{
    return { type: Types.SIGNUP_APP,username}
}
//Get Profile USER
export const fetchProfileUser = (token:string)=>{
    return (dispatch:any) =>{
        
        return(
            axios({
                method: 'GET',
                url: `${API_URL_HEROKU}/users/me`,
                headers: { 
                    'Authorization': `Bearer ${token}`
                }

            })
            .then( res=>{
                const data = {
                    name: res.data.name,
                    username : res.data.email,
                }
                if(res.status===200){
                    dispatch(actions.stopLoading())
                    dispatch(getProfileUser(data))
                }
            })
            .catch(err=>{console.log(err)})
        ) 
    }
}

export const getProfileUser = (data:object)=>{
    console.log(data)
    return { type: Types.GET_PROFILE,data}
}
