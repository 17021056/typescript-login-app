import React from 'react';
import { RootStateOrAny, useSelector } from 'react-redux';
import { Redirect,Route } from 'react-router-dom';
import Profile from '../../components/Profile/Profile';


function ProfilePage() {
    const token = useSelector((state:RootStateOrAny) =>state.authState.token)
    
    return (
        <Route
        path = '/Profile'
        render={({ location }) =>
            token ? (
            <Profile/>
            ) : (
            <Redirect
                to={{
                    pathname:'/Login',
                    state:{from:location}
                }}
            />
            )
        }
        />
       
    );
}

export default ProfilePage;