import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import * as actions from '../../redux/actions/index'

function SignUp() {
    const [signup, setSignup] = useState({
        name:'',
        username: '',
        password:'',
        cfpassword: '',
    })
    const dispatch = useDispatch()
    let history = useHistory()
    const _onchange =(e:any) => {
        let key = e.target.name
        let value = e.target.value
        setSignup((prevState)=>{
           return { 
            ...prevState,
            [key]: value
            }
        })
    }
    const _onSignup = (rawSignUp:any) => {
        dispatch(actions.fetchSignUpApp(rawSignUp))
    }
    const _onSubmit = (e:any) =>{
        e.preventDefault()
        const rawSignUp ={
            "name":`${signup.name}`,
            "email":`${signup.username}`,
            "password":`${signup.password}`}
        if(signup.password===signup.cfpassword){
            _onSignup(rawSignUp)
            history.push('/Login')
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
                                required
                            />
                        </div>
                        <div className="form__input mb-3 pl-4 pr-4">
                            <input 
                                type="email" 
                                className="p-2 mb-2" 
                                placeholder="username"
                                name="username"
                                value={signup.username}
                                onChange ={(e)=>_onchange(e)}
                                required
                            />
                        </div>
                        <div className="form__input mb-3 pl-4 pr-4">
                            <input 
                                type="password" 
                                placeholder="password"
                                className="p-2 mb-2" 
                                name="password"
                                value={signup.password}
                                onChange ={(e)=>_onchange(e)}
                                required
                            />   
                        </div>
                        <div className="form__input mb-5 pl-4 pr-4">
                            <input 
                                type="password" 
                                placeholder="confirm password"
                                name="cfpassword"
                                className="p-2 mb-2"
                                value={signup.cfpassword}
                                onChange ={(e)=>_onchange(e)}
                                required
                            />   
                        </div> 
                        <div className="mb-4">
                            <button type="submit" className="btn text-white btn-outline-dark mr-2">SignUp</button>
                            <Link to="/Login" className="text-dark" style={{textDecoration:"none"}}>
                                     <button type="submit" className="btn text-dark btn-light">Login</button>
                            </Link>
                        </div>                      
                    </form>
                </div>
            </div>
        </div>
    );
}

export default SignUp;