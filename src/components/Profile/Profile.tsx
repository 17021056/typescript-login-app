import React, { useEffect } from 'react';
import { RootStateOrAny, useDispatch, useSelector } from 'react-redux';
import * as actions from '../../redux/actions/index'

import './Profile.css'

function Profile() {
    const profile = useSelector((state:RootStateOrAny) =>state.profile)
    const token = useSelector((state:RootStateOrAny) =>state.authState.token)
    const dispatch = useDispatch()
    useEffect(() =>{
        dispatch(actions.startLoading())
        dispatch(actions.fetchProfileUser(token))
    },[dispatch,token])
    return (
        <div className="profile row justify-content-center align-content-center">
            <div className="profile-card col-xl-5 col-lg-5 col-md-6 col-sm-9">
                <div className="profile-card__icon text-center">
                     <i className="fa fa-user" style={{fontSize:'80px'}}></i>
                     <div className="mt-4">{profile.name}</div>
                     <div>{profile.username}</div>
                </div>
            </div>
        </div>
    );
}

export default Profile;