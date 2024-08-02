import React from 'react'

import { useDispatch } from "react-redux";
import { showLoading, hideLoading } from "../redux/features/alertSlice.js"


import { Form, Input, message } from "antd";

import { Link, useNavigate } from "react-router-dom";

import axios from 'axios';

const Login = () => {
    const navigate = useNavigate();

    const dispatch = useDispatch();

    const onSubmitHandler = async (values) => {
        // console.log("Success: Login Form Submitted");
        // console.log(values);


        try {
            dispatch(showLoading());
            const res = await axios.post('/api/v1/user/login', values);
            window.location.reload(); // to clear old data from redux store and reload page
            dispatch(hideLoading());
            // from api
            if (res.data.success) {
                message.success(`Logged in Successfully`);
                localStorage.setItem('token', res.data.token);
                navigate('/');
            } else {
                message.error(res.data.message);
            }
        } catch (error) {
            // console.log(error);
            dispatch(hideLoading());
            message.error("something went wrong") // using antd package
        }


    }



    return (
        <div className='form-container d-flex flex-column vw-100 justify-content-center align-items-center p-10 mt-10'>

            {/* A note to the user */}
            <h1 className='text-center bg-primary text-light p-2'>A Must Read Note is given for the first time user below the login form:</h1>
            <Form layout='vertical' onFinish={onSubmitHandler} className='card p-5 w-80'>
                <h1 className='text-center'>Login</h1>

                <Form.Item label='EMAIL' name='email' >
                    <Input type='email' required />
                </Form.Item>


                <Form.Item label='PASSWORD' name='password'>
                    <Input type='password' required />
                </Form.Item>

                <Link to={"/register"}
                    className='mb-5'
                >Not a Registered User? Register First</Link>
                <button className='btn btn-primary' type='submit'>Login</button>

            </Form>
            <div style={{ padding: '1rem', backgroundColor: "lightgreen" }}>
                <h2>Note:</h2>
                <div>There can be three type of users</div>
                <ol>
                    <li>Normal User</li>
                    <li>Doctor User</li>
                    <li>Admin User</li>
                </ol>
                <div> Only db admin has access to create admin account and only admin account user can accept doctor application request</div>
                <div>You can create your own dummy users by Registering first</div>
                <div>You can Register and then proceed to the Login Page</div>
                <div>To give the user, doctor privileges or to make your user account, a doctor account fill the doctor application form in the sidebar and then use the below provided dummy <span className='bg-primary text-white'>admin account</span> details to log in and accept doctor application</div>
                Here's the list of dummy accounts:
                <ol className='w-80'>
                    <li style={{ backgroundColor: "yellow" }}>dummy admin email: <span className='text-primary'>react@admin1</span> password: <span className='text-primary'>react@admin1</span></li>
                    <li>dummy doctor email: <span className='text-primary'>doc@ock</span> password: <span className='text-primary'>doc@ock</span></li>
                    <li>dummy user email: <span className='text-primary'>peter@parker</span> password: <span className='text-primary'>peter@parker</span></li>
                </ol>
            </div>


        </div >
    )
}

export default Login