import React from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { NavLink, useHistory } from "react-router-dom";

const ResetPassword = () => {
    const { register, handleSubmit } = useForm();
    const history = useHistory();
    const config = {    // setting headers
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
        },
    }
    const user = JSON.parse(sessionStorage.getItem('userInfo'))
    const id = user.id;

    const onSubmit = async (payload) => {
        // eslint-disable-next-line
        const res = await axios.put(
            `$${process.env.REACT_APP_API_ENDPOINT || ''}/api/v1/users/myAccount/${id}`, 
            {
            password: payload.password}, 
            config
            ).then(function (res){
              localStorage.setItem('message', 'You have changed your password');
              history.push('/')
              window.location.reload() //reload session to see new state
            }).catch( error => {
                localStorage.setItem('message', 'Invalid username or password');
                console.log(error);
            })           
    }
    return(
        <div className="col-md-6 offset-md-4 col-xl-3 offset-xl-4 align-items-center pt-5">
                <div className="card shadow mb-3">
                    <div className="card-body">
                        <h1 className="text-center">Reset Password</h1>
                            <div className="col-6 offset-3">
                                <form onSubmit={handleSubmit(onSubmit)}>
                                    <label htmlFor="password" className="form-label">New Password</label>
                                        <input type="password" className="form-control" {...register('password', { required: true })}/>
                                <button className="btn btn-info my-3"> New Password </button>
                            </form>
                            <div className="mb-3">
                                <NavLink to="/myAccount"> Back to my account </NavLink>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
    )
}

export default ResetPassword;