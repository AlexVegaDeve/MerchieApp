import React from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import {NavLink, useHistory} from 'react-router-dom';

const RegisterPage = () => {
    const { register, handleSubmit } = useForm();
    const history = useHistory();

    const onSubmit = (data) => {
        axios({
            method: 'post',
            url: `${process.env.API_ENDPOINT || ''}/api/v1/users/register`,
            data: {
                email: data.email, 
                username: data.username,
                password: data.password 
            }
        })
        localStorage.setItem('message', 'You have successfully registered! Please sign in.');
        history.push('/login')
    }
        return(
            <div className="col-md-6 offset-md-3 col-xl-3 offset-xl-4 align-items-center pt-5">
                    <div className="card shadow mb-3">
                        <div className="card-body">
                            <h1 className="text-center">Register</h1>
                                <div className="col-6 offset-3">
                                    <form onSubmit={handleSubmit(onSubmit)}>
                                        <label htmlFor="email" className="form-label">Email</label>
                                            <input className="form-control"{...register('email', { required: true })} />
                                        <label htmlFor="username" className="form-label">Username</label>
                                            <input className="form-control"{...register('username', { required: true })}/>
                                        <label htmlFor="password" className="form-label">Password</label>
                                            <input type="password" className="form-control" {...register('password', { required: true })}/>
                                        <button className="btn btn-info my-3"> Register </button>
                                    </form>
                                        <div className="mb-3">
                                            <NavLink to="/merch"> Back to merch </NavLink>
                                        </div>
                                </div>
                        </div>
                    </div>
                </div>
        )
    }


export default RegisterPage;