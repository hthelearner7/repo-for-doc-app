import React from 'react'

// import "../styles/RegisterStyle.css"

import { Form, Input, message } from "antd";

import { Link, useNavigate } from "react-router-dom";

import axios from 'axios';

import { useDispatch } from 'react-redux';
import { showLoading, hideLoading } from '../redux/features/alertSlice';


const Register = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();


    const onSubmitHandler = async (values) => {
        try {
            dispatch(showLoading());
            const res = await axios.post('/api/v1/user/register', values);
            dispatch(hideLoading());
            // from api
            if (res.data.success) {
                message.success(`Registered Successfully`);
                navigate('/login');
            } else {
                message.error(res.data.message);
            }
        } catch (error) {
            dispatch(hideLoading());
            console.log(error.message);
            message.error("something went wrong") // using antd package
        }


    }


    return (
        <div className='form-container d-flex flex-column vh-100 vw-100 justify-content-center align-items-center'>
            <Form layout='vertical' onFinish={onSubmitHandler} className='card p-5 w-80'>
                <h1 className='text-center'>Register Now</h1>
                <Form.Item label='NAME' name='name'>
                    <Input type='text' required />
                </Form.Item>

                <Form.Item label='EMAIL' name='email' >
                    <Input type='email' required />
                </Form.Item>


                <Form.Item label='PASSWORD' name='password'>
                    <Input type='password' required />
                </Form.Item>

                <Link to={"/login"}
                    className='mb-5'
                >Already a Registered User? Login Instead</Link>
                <button className='btn btn-primary' type='submit'>Register</button>

            </Form>
        </div>
    )
}

export default Register