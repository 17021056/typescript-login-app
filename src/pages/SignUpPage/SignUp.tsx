import React, { useState } from 'react';
import { RootStateOrAny, useDispatch, useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import Loading from '../../components/Loading/Loading';
import {checkInput} from '../../helper/helper'
import * as actions from '../../redux/actions/index'

function SignUp() {
    const [signup, setSignup] = useState({
        name:'',
        username: '',
        password:'',
        cfpassword: '',
    })
    const [message , setMessage] = useState({
        name:'',
        username : '',
        password: '',
        cfpassword: '',
    })
    const isloading = useSelector((state:RootStateOrAny) =>state.loadingscreen)
    const messageSignup = useSelector((state:RootStateOrAny) =>state.message)
    const history = useHistory()
    const dispatch = useDispatch()
    const _onchange =(e:any) => {
        let key = e.target.name
        let value = e.target.value
        setSignup((prevState)=>{
           return { 
            ...prevState,
            [key]: value
            }
        })
        setMessage((prevState)=>{
            return { 
             ...prevState,
             [key]: ''
             }
         })
         if(key==='username' && value.length>=1){
            dispatch(actions.resetMessage())
        }
    }
    const _onSignup = (rawSignUp:any) => {
        dispatch(actions.startLoading())
        dispatch(actions.fetchSignUpApp(rawSignUp,history))
    }
    const _onSubmit = (e:any) =>{
        e.preventDefault()
        const rawSignUp ={
            "name":`${signup.name}`,
            "email":`${signup.username}`,
            "password":`${signup.password}`}
        let statusSubmit = checkInput(signup.name,signup.username, signup.password,signup.cfpassword)
        setMessage({
            name:statusSubmit.message.messageName,
            username : statusSubmit.message.messageUserName,
            password: statusSubmit.message.messagePassword,
            cfpassword: statusSubmit.message.messagecfpassword,
        })
        if(statusSubmit.isSubmit){
            _onSignup(rawSignUp)
        }
    }
    return (
        <div id="container">
            <div className="content row justify-content-center">
                <div className="col-xl-5 col-lg-5 col-md-7 col-sm-9">
                    <form  onSubmit={e=>_onSubmit(e)} className="content__form text-white text-center">
                        <h1 className="m-3">SignUp</h1>
                        <div className="form__input mb-3 pl-4 pr-4">
                            <input 
                                type="text" 
                                className="p-2 mb-2" 
                                placeholder="name"
                                name="name"
                                value={signup.name}
                                onChange ={(e)=>_onchange(e)}
                            />
                            <div>{message.name}</div>
                        </div>
                        <div className="form__input mb-3 pl-4 pr-4">
                            <input 
                                type="email" 
                                className="p-2 mb-2" 
                                placeholder="username"
                                name="username"
                                value={signup.username}
                                onChange ={(e)=>_onchange(e)}
                            />
                            <div>{message.username}</div>
                        </div>
                        <div className="form__input mb-3 pl-4 pr-4">
                            <input 
                                type="password" 
                                placeholder="password"
                                className="p-2 mb-2" 
                                name="password"
                                value={signup.password}
                                onChange ={(e)=>_onchange(e)}
                            />   
                            <div>{message.password}</div>
                        </div>
                        <div className="form__input mb-4 pl-4 pr-4">
                            <input 
                                type="password" 
                                placeholder="confirm password"
                                name="cfpassword"
                                className="p-2 mb-2"
                                value={signup.cfpassword}
                                onChange ={(e)=>_onchange(e)}
                            />   
                            <div>{message.cfpassword}</div>
                        </div> 
                        <div className="form__message mb-2">{messageSignup}</div>
                        <div className="mb-4">
                            <button type="submit" className="btn text-white btn-outline-dark mr-2">SignUp</button>
                            <Link to="/Login" className="text-dark" style={{textDecoration:"none"}}>
                                     <button type="submit" className="btn text-dark btn-light">Login</button>
                            </Link>
                        </div>                      
                    </form>
                </div>
            </div>
            { isloading ? <Loading/>:''} 
        </div>
       
    );
}

export default SignUp;