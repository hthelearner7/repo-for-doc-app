
import React, { useState, useEffect } from 'react'
import Layout from './../../components/Layout';


import { useDispatch, useSelector } from 'react-redux'
import { Form, Row, Col, Input, TimePicker, message } from 'antd';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { showLoading, hideLoading } from '../../redux/features/alertSlice';
import { useParams } from 'react-router-dom';

import moment from 'moment';



const Profile = () => {
    const { user } = useSelector(state => state.user);
    const [doc, setDoc] = useState(null);

    const params = useParams();


    const dispatch = useDispatch();
    const navigate = useNavigate();


    const getDocDetails = async (req, res) => {
        try {
            const res = await axios.post('/api/v1/doctor/get-doc-profile', { userId: params._id },
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`
                    }
                }
            )

            if (res.data.success) {
                setDoc(res.data.data);
                // console.log(res.data.data);
                // console.log(doc);
                message.success('Doctor Profile Info Fetched successfully.')
            }
        } catch (error) {
            console.log(error);
            message.error(error.message);
        }
    }


    const onUpdateDetailsFormSubmit = async (values) => {
        // console.log("Doctor Form Submitted");
        // console.log(values);
        try {
            dispatch(showLoading());
            const res = await axios.post('/api/v1/doctor/update-doc-profile', {
                ...values, userId: user._id,
            },
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`
                    }
                }
            )
            dispatch(hideLoading());
            if (res.data.success) {
                message.success(res.data.message);
                // navigate('/')
            } else {
                message.error(res.data.message);
            }

        } catch (error) {
            dispatch(hideLoading());
            console.log(error);
            message.error(error.message);

        }
    }


    useEffect(() => {
        getDocDetails();
    }, [])



    return (
        <Layout>
            <h1 className='text-center'>Manage Profile</h1>
            {
                doc ?
                    (<Form layout='vertical' onFinish={onUpdateDetailsFormSubmit} className='m-4' initialValues={doc}>
                        <h4>Personal Details: </h4>
                        <Row gutter={10}>
                            <Col xs={20} md={24} lg={12}>
                                <Form.Item label="First Name" name='firstName' required>
                                    <Input type="text" placeholder="Enter your first name: " />
                                </Form.Item>
                            </Col>
                            <Col xs={20} md={24} lg={12}>
                                <Form.Item label="Last Name" name='lastName' required>
                                    <Input type="text" placeholder="Enter your last name: " />
                                </Form.Item>
                            </Col>
                            <Col xs={20} md={24} lg={12}>
                                <Form.Item label="Phone" name='phone' required>
                                    <Input type="text" placeholder="Enter your Phone Number: " />
                                </Form.Item></Col>
                            <Col xs={20} md={24} lg={12}>
                                <Form.Item label="E-mail" name='email' required>
                                    <Input type="email" placeholder="Enter your Email Address: " />
                                </Form.Item></Col>
                            <Col xs={20} md={24} lg={12}>
                                <Form.Item label="Website" name='website'>
                                    <Input type="text" placeholder="Enter your Website (if any): " />
                                </Form.Item></Col>
                            <Col xs={20} md={24} lg={12}>
                                <Form.Item label="Address" name='address' required>
                                    <Input type="text" placeholder="Enter your Address: " />
                                </Form.Item></Col>
                        </Row>
                        <h4>Professional Details: </h4>
                        <Row gutter={10}>
                            <Col xs={20} md={24} lg={12}>
                                <Form.Item label="Specialization" name='specialization' required>
                                    <Input type="text" placeholder="Enter your Specialization details: " />
                                </Form.Item>
                            </Col>
                            <Col xs={20} md={24} lg={12}>
                                <Form.Item label="Experience" name='experience' required>
                                    <Input type="text" placeholder="Enter your Experience (in Years): " />
                                </Form.Item>
                            </Col>
                            <Col xs={20} md={24} lg={12}>
                                <Form.Item label="Fee Info" name='feeInfo' required>
                                    <Input type="text" placeholder="Enter your Fee: " />
                                </Form.Item></Col>

                        </Row>
                        <div className='d-flex justify-content-center '><button type='submit' className='btn btn-primary'>Update Form</button></div>

                    </Form>)
                    : null
            }

        </Layout>
    )

}


export default Profile;

