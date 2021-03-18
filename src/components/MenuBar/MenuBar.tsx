import React from 'react';
import { RootStateOrAny, useDispatch, useSelector } from 'react-redux';
import { Link,Route } from 'react-router-dom';
import * as actions from '../../redux/actions/index'
import Loading from '../Loading/Loading';


interface RouteProp {
    label: string;
    to: string;
    activeOnlyWhenExact: boolean;
}

const MenuBarLink = ({...rest}:RouteProp) =>{
    return (
        <Route path={rest.label}
            exact={rest.activeOnlyWhenExact}
            children={({match})=>{
                var active = match   ? "active" : "";
                return <li className={`nav-item  ${active}`}>
                            <Link to={rest.to} className="nav-link" >{rest.label}</Link>
                       </li>
               
            }}
        />
    )
}
const  showMenuBar=(menubars: {
        name: string;
        to: string;
        exact: boolean;
    }[])=>{
    var menubar = null;
    if(menubars.length>0){
        menubar = menubars.map((menubar,index)=>{
            return <MenuBarLink key={index} 
                                label={menubar.name}
                                to={menubar.to}
                                activeOnlyWhenExact={menubar.exact}    
                                />
        })
    }
    return menubar
}

function MenuBar() {
    const isloading = useSelector((state:RootStateOrAny) =>state.loadingscreen)
    const authState = useSelector((state:RootStateOrAny) =>state.authState)
    const dispatch = useDispatch()
    const logoutApp =()=>{
        console.log(authState.token)
        dispatch(actions.startLoading())
        dispatch(actions.fetchLogoutApp(authState.token))
    }
    const menubars = [
        {
            name: 'Room',
            to:'/',
            exact: true
        },
        {
            name: 'Profile',
            to:'/Profile',
            exact: false
        },
    ]
    return (
        <nav className="navbar fixed-top navbar-expand-lg navbar-dark bg-dark">
            <div className="navbar-brand">Babe</div>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse justify-content-between" id="navbarNav">
                <ul className="navbar-nav">
                {/* <li className="nav-item ">
                    <a className="nav-link" href="#">Home </a>
                </li> */}
                 {showMenuBar(menubars)} 
                </ul>
                {authState.token ? (<button onClick={logoutApp} className="btn btn-danger mr-2">Logout</button>) :
                (<div className="">
                
                    <Link to="/Login">
                        <button className="btn btn-success mr-2">Login</button>
                    </Link> 
                    <Link to="/SignUp">
                        <button className="btn btn-warning">Signup</button>
                    </Link>
                </div>)
                }
                
            </div>
            { isloading ? <Loading/>:''} 
        </nav>
    );
}

export default MenuBar;