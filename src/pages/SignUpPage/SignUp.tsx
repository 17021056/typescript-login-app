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
                        <input 
                            type="text" 
                            className="form__input-email p-2 pl-3 mt-4 ml-4 mr-4 mb-4" 
                            placeholder="name"
                            name="name"
                            value={signup.name}
                            onChange ={(e)=>_onchange(e)}
                            required
                        />
                        <input 
                            type="email" 
                            className="form__input-email p-2 pl-3 ml-4 mr-4 mb-4" 
                            placeholder="username"
                            name="username"
                            value={signup.username}
                            onChange ={(e)=>_onchange(e)}
                            required
                        />
                        <input 
                            type="password" 
                            placeholder="password"
                            className="form__input-email p-2 pl-3 ml-4 mr-4 mb-4" 
                            name="password"
                            value={signup.password}
                            onChange ={(e)=>_onchange(e)}
                            required
                        />
                         <input 
                            type="password" 
                            placeholder="confirm password"
                            name="cfpassword"
                            className="form__input-email p-2 pl-3 ml-4 mr-4 mb-5"
                            value={signup.cfpassword}
                            onChange ={(e)=>_onchange(e)}
                            required
                        />
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