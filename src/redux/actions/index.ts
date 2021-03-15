// import { createAction } from "typesafe-actions";
import axios from 'axios'
import * as Types from '../../constants/ActionTypes'
import { API_URL_LOCAL } from '../../constants/config'
import * as actions from '../../redux/actions/index'

interface rawType {
    email: string;
    password: string;
    isremember:boolean
}

export const increment = ()=>{
    return { type: Types.ADD}
}


export const fetchLoginApp = (raw:rawType)=>{
    return (dispatch:any) =>{
        const data = {
            email:  raw.email,
            password: raw.password
        }
        return(
            axios({
                method: 'POST',
                url: `${API_URL_LOCAL}/users/login`,
                data: data,
            })
            .then( res=>{
                if(res.status===200){
                    dispatch(actions.loginApp())
                    if(raw.isremember===true){
                        console.log('oke')
                        dispatch(actions.saveTokenLocal(res.data.token))
                    }
                    else if(raw.isremember===false){dispatch(actions.saveToken(res.data.token))}
                }
            })
        ) 
    }
}
export const loginApp = ()=>{
    return { type: Types.LOGIN_APP}
}

export const saveToken = (token:string)=>{
    return { type: Types.SAVE_TOKEN,token}
}

export const saveTokenLocal = (token:string)=>{
    return { type: Types.SAVE_TOKEN_LOCAL,token}
}

export const fetchLogoutApp = (token:string)=>{
    return (dispatch:any) =>{
        console.log(token)
        return(
            axios({
                method: 'POST',
                url: `${API_URL_LOCAL}/users/me/logout`,
                headers: { 
                    'Authorization': `Bearer ${token}`
                }
            })
            .then( res=>{
                if(res.status===200){
                    dispatch(actions.logoutApp())                
                }
            })
            .catch(err=>{console.log(err)})
        ) 
    }
}

export const logoutApp = ()=>{
    return { type: Types.LOGOUT_APP}
}
interface rawSignUpType {
    name: string
    email: string;
    password: string;
}

export const fetchSignUpApp = (rawSignUp:rawSignUpType)=>{
    return (dispatch:any) =>{
        
        console.log(JSON.stringify(rawSignUp))
        return(
            axios({
                method: 'POST',
                url: `${API_URL_LOCAL}/users`,
                headers: { 
                    'Content-Type': 'application/json'
                  },
                data: JSON.stringify(rawSignUp)
            })
            .then( res=>{
                if(res.status===201){
                   dispatch(signupApp(res.data.user.email))                
                }
            })
            .catch(err=>{console.log(err)})
        ) 
    }
}

export const signupApp = (username:string)=>{
    return { type: Types.SIGNUP_APP,username}
}

export const fetchProfileUser = (token:string)=>{
    return (dispatch:any) =>{
        
        return(
            axios({
                method: 'GET',
                url: `${API_URL_LOCAL}/users/me`,
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
                    console.log(data)
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
