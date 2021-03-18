import * as Types from '../../constants/ActionTypes'
import * as messages from '../../constants/messege'

let initialState = ''

const message = ( state=initialState , action:any)=>{
    switch(action.type){
        case Types.MESSAGE_LOGIN_FAILED:
            state = messages.LOGIN_FAILURE
        return state
        case Types.MESSAGE_SIGNUP_FAILED:
            state = messages.EXIST_email
        return state
        case Types.RESET_MESSAGE :
            state = ''
            return state
        default:
            return state
    }
}   
export default message