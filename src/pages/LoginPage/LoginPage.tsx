import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import  './LoginPage.css'
import { RootStateOrAny, useDispatch, useSelector } from 'react-redux';
import * as actions from '../../redux/actions/index'

function LoginPage() {
    let history = useHistory();
    const authState = useSelector((state:RootStateOrAny) =>state.authState)
    const [login, setLogin] = useState({
        username: '',
        password:'',
        isremember: false
    })
    useEffect(() => {
        setLogin((prevState)=>{
            return{
                ...prevState,
                username:authState.username,            
            }
        })
    }, [authState])
    const dispatch = useDispatch()
    const _onchange =(e:any) => {
        let key = e.target.name
        let value = e.target.type === 'checkbox'?  e.target.checked : e.target.value
        setLogin((prevState)=>{
           return { 
            ...prevState,
            [key]: value
            }
        })
    }
    const _loginApp = (raw:any)=>{
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
                        <input 
                            type="text" 
                            className="form__input-email p-2 pl-3 ml-4 mt-4 mr-4 mb-4" 
                            placeholder="username"
                            value = {login.username}
                            onChange ={(e)=>_onchange(e)}
                            name="username"
                            required
                        />
                        <input 
                            type="password" 
                            placeholder="password"
                            className="form__input-email p-2 pl-3 ml-4 mr-4 mb-4" 
                            value = {login.password}
                            required
                            onChange ={_onchange}
                            name="password"
                        />
                        <div className="form__check-input">
                            <input 
                                type="checkbox" 
                                placeholder="password"
                                className="p-2 pl-3 ml-4 mr-2 mb-5" 
                                checked = {login.isremember}
                                onChange ={_onchange}
                                name="isremember"
                            />
                            <label>Do you want to keep login?</label>
                        </div>
                        
                        <div className="mb-4">
                            <button type="submit" className="btn text-white btn-outline-dark mr-2">Login</button>
                            
                                <Link to="/Signup" className="text-dark" style={{textDecoration:"none"}}>
                                     <button type="submit" className="btn text-dark btn-light">Signup</button>
                                </Link>
                        </div>                      
                    </form>
                </div>
            </div>
        </div>

       
    );
}

export default LoginPage;