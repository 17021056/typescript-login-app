
import * as Types from '../../constants/ActionTypes'

const token = localStorage.getItem('token') 
var initialState = { 
    num:1,
    isLogin:false,
    token: token? JSON.parse(token) : '',
    username:''
}

const authState =(state=initialState , action:any)=>{
    switch(action.type){
        case Types.ADD :
            state.num = state.num + 1
            return {...state}
        case Types.LOGIN_APP :
            state.isLogin = true
            return {...state}
        case Types.LOGOUT_APP :
            state.isLogin = false
            localStorage.removeItem('token')
            state.token=''
            return {...state}
        case Types.SAVE_TOKEN :
            console.log(action)
            state.token = action.payload.token
            return {...state}
        case Types.SAVE_TOKEN_LOCAL :
            state.token = action.payload.token
            localStorage.setItem('token',JSON.stringify(action.token))
            return {...state}
        case Types.SIGNUP_APP :
            state.username = action.payload.username
            return {...state}
        default: 
            return state
    }
}



export default authState 