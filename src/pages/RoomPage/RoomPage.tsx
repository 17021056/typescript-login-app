import React from 'react';
import { useDispatch, useSelector ,RootStateOrAny} from 'react-redux';
import * as actions from '../../redux/actions/index'


function RoomPage() {
    const number = useSelector((state:RootStateOrAny) =>state.authState)
    const dispatch = useDispatch()
    const addNum = () =>{
        dispatch(actions.increment())
    }
    return (
        <div className="text-center mt-5">
            <h1>This is a RoomClass</h1>
            <p>{number.num}</p>
            <button onClick={addNum} className="btn btn-success">+</button>
        </div>
    );
}

export default RoomPage;