import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import  './LoginPage.css'
import { RootStateOrAny, useDispatch, useSelector } from 'react-redux';
import * as actions from '../../redux/actions/index'
import {checkInput} from '../../helper/helper'
import Loading from '../../components/Loading/Loading';

function LoginPage() {
    let history = useHistory();
    const authState = useSelector((state:RootStateOrAny) =>state.authState)
    const isloading = useSelector((state:RootStateOrAny) =>state.loadingscreen)
    const messageLogin = useSelector((state:RootStateOrAny) =>state.message)
    const dispatch = useDispatch()
    const [login, setLogin] = useState({
        username: '',
        password:'',
        isremember: false
    })
    const [message , setMessage] = useState({
        username : '',
        password: '',
    })
    useEffect(() => {
        setLogin((prevState)=>{
            return{
                ...prevState,
                username:authState.username,            
            }
        })
        
    }, [authState])
    const _onchange =(e:any) => {
        let key = e.target.name
        let value = e.target.type === 'checkbox'?  e.target.checked : e.target.value
        setLogin(
            (prevState)=>{
                return { 
                ...prevState,
                [key]: value,
            }
        })
        setMessage(
            (prevState)=>{
                return { 
                 ...prevState,
                 [key]: '',
                 statuslogin: '',
                 }
             }
        )
        if(value.length===1){
            dispatch(actions.resetMessage())
        }
    }
    const _loginApp = (raw:any)=>{
        dispatch(actions.startLoading())
        dispatch(actions.fetchLoginApp(raw))
        _resetForm()
    }
    const _onSubmit = (e:any) =>{
        e.preventDefault()
        let raw = {
            email: login.username,
            password: login.password,
            isremember: login.isremember
        }
        let statusSubmit = checkInput('login',login.username, login.password,'login')
        console.log(statusSubmit)
        setMessage(prevState=>{
            return{ 
                ...prevState,
                username : statusSubmit.message.messageUserName,
                password: statusSubmit.message.messagePassword,
            }        
        })
        if(statusSubmit.isSubmit){
            if(login.isremember){
                if(window.confirm('Are you sure to keep login?'))
                {
                _loginApp(raw)   
                }
             }
             else{
                 _loginApp(raw)
             }            
        } 
    }
    const _resetForm = () => {
        setLogin((prevState)=>{
           return{
               ...prevState,
                password:'',
                isremember: false
           }
        })
    }
    useEffect(() =>{
        if(authState.token!=='')
        {   
            history.push('/')
        }
    })
    return (
        <div id="container">
            <div className="content row justify-content-center">
                <div className="col-xl-5 col-lg-5 col-md-7 col-sm-9">
                    <form onSubmit={e=>_onSubmit(e)} className="content__form text-white text-center zoomInUp">
                        <h1 className="m-3">Login</h1>
                        <div className="form__input mb-3 pl-4 pr-4">
                            <input 
                                type="email" 
                                className=" p-2 mb-2" 
                                placeholder="username"
                                value = {login.username}
                                onChange ={(e)=>_onchange(e)}
                                name="username"
                            />
                            <div>{message.username}</div>
                        </div>
                        <div className="form__input mb-3 pl-4 pr-4">
                            <input 
                                type="password" 
                                placeholder="password"
                                className=" p-2 mb-2" 
                                value = {login.password}
                                onChange ={_onchange}
                                name="password"
                            />
                            <div>{message.password}</div>
                        </div>
                        <div className="form__check-input">
                            <input 
                                type="checkbox" 
                                placeholder="password"
                                className="p-2 pl-3 ml-4 mr-2 mb-4" 
                                checked = {login.isremember}
                                onChange ={_onchange}
                                name="isremember"
                            />
                            <label>Do you want to keep login?</label>
                        </div>
                        <div className="form__message mb-2">{messageLogin}</div>
                        <div className="mb-4">
                            <button type="submit" className="btn text-white btn-outline-dark mr-2">Login</button>                           
                                <Link to="/Signup" className="text-dark" style={{textDecoration:"none"}}>
                                     <button type="submit" className="btn text-dark btn-light">Signup</button>
                                </Link>
                        </div>                      
                    </form>
                </div>
            </div>
            { isloading ? <Loading/>:''} 
        </div>

       
    );
}

export default LoginPage;