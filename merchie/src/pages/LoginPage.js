import React from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import {NavLink, useHistory} from 'react-router-dom';
import Message from '../components/Message';

const LoginPage = () => {
        const { register, handleSubmit } = useForm();
        const history = useHistory();
        const config = {    // setting headers
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
        }
        const onSubmit = async (payload) => {
            // eslint-disable-next-line
            const res = await axios.post(
                `${(process.env.REACT_APP_API_ENDPOINT)}/api/v1/users/login`, 
                {
                username: payload.username,
                password: payload.password}, 
                config
                ).then(function (res){
                  const user  = res.data;
                  sessionStorage.setItem('userInfo', JSON.stringify(user) ); // add user session to sessionStorage
                  localStorage.setItem('message', 'You have been logged in!');
                  history.push('/')
                  window.location.reload() //reload session to see new state
                }).catch( error => {
                    localStorage.setItem('message', 'Invalid username or password');
                    console.log(error);
                    history.push('/login');
                })           
        }
        console.log(process.env.REACT_APP_API_ENDPOINT);
        return(
            <div className="col-md-6 offset-md-3 col-xl-3 offset-xl-4 align-items-center pt-5">
                    {localStorage.message && <Message>{localStorage.message}</Message>}
                    <div className="card shadow mb-3">
                        <div className="card-body">
                            <h1 className="text-center">Login</h1>
                                <div className="col-6 offset-3">
                                    <form onSubmit={handleSubmit(onSubmit)}>
                                        <label htmlFor="username" className="form-label">Username</label>
                                            <input className="form-control"{...register('username', { required: true })}/>
                                        <label htmlFor="password" className="form-label">Password</label>
                                            <input type="password" className="form-control" {...register('password', { required: true })}/>
                                    <button className="btn btn-info my-3"> Login </button>
                                </form>
                                <div className="mb-3">
                                    <NavLink to="/"> Back to merch </NavLink>
                                </div>
                                <div className="mb-3">
                                    <NavLink to="/register"> New user? Register here </NavLink>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
        )
    }

export default LoginPage;