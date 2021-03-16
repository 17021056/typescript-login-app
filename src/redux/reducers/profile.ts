
import * as Types from '../../constants/ActionTypes'
const initialState ={ 
    name: '',
    username: '',
}

const profile =(state=initialState , action:any)=>{
    switch(action.type) {
        case Types.GET_PROFILE :
        state = {
            name: action.payload.data.name,
            username: action.payload.data.username
        }
        return {...state}
        default:
        return {...state}
    }
}
export default profile