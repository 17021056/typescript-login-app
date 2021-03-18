import * as Types from '../../constants/ActionTypes'

let initialState = false;

const loadingscreen = (state = initialState ,action:any) =>{
    switch (action.type) {
        case Types.STOP_LOADING :
            state = false;
            return state
        case Types.START_LOADING :
        state = true;
        return state
        default:
            return state
    }
}

export default loadingscreen