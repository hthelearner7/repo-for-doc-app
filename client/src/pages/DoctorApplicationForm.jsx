import React, { useState } from 'react'
import Layout from './../components/Layout';
import { Form, Row, Col, Input, TimePicker, message } from 'antd';
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import { showLoading, hideLoading } from '../redux/features/alertSlice';
import axios from 'axios';

import moment from 'moment';


const DoctorApplicationForm = () => {

    const { user } = useSelector(state => state.user);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [startTime, setStartTime] = useState("");
    const [endTime, setEndTime] = useState("");

    const onFormSubmit = async (values) => {
        // console.log("Doctor Form Submitted");
        // console.log(values);
        try {
            // console.log(values);
            // console.log({
            //     ...values, timings: [moment(startTime, "HH-mm").toISOString(),
            //     moment(endTime, "HH-mm").toISOString()], userId: user._id
            // });
            dispatch(showLoading());
            const res = await axios.post('api/v1/user/apply-doctor', {
                ...values, timings: [moment(startTime, "HH-mm").toISOString(),
                moment(endTime, "HH-mm").toISOString()], userId: user._id
            },
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`
                    }
                }
            )
            dispatch(hideLoading());
            if (res.data.success) {
                message.success('Applied Successfully');
                navigate('/')
            } else {
                message.error(res.data.message);
            }

        } catch (error) {
            dispatch(hideLoading());
            console.log(error);
            message.error(error.message);

        }

    }


    return (
        <>
            <Layout>
                <h1 className='text-center pt-2'>Doctor Application Form</h1>
                <Form layout='vertical' onFinish={onFormSubmit} className='m-4'>
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
                        <Col xs={20} md={24} lg={12}>
                            <Form.Item label="Start Time" required>
                                {/* <TimePicker.RangePicker format="HH:mm" /> */}
                                <input
                                    type="text"
                                    placeholder="HH:mm e.g. 12:23"
                                    onChange={(e) => setStartTime(e.target.value)}
                                    className='w-80 card p-1'
                                    value={startTime}
                                />
                            </Form.Item>
                        </Col>
                        <Col xs={20} md={24} lg={12}>
                            <Form.Item label="End Time" required>
                                <input
                                    type="text"
                                    placeholder="HH:mm e.g. 19:30"
                                    onChange={(e) => setEndTime(e.target.value)}
                                    className='w-80 card p-1'
                                    value={endTime}
                                />
                            </Form.Item>
                        </Col>

                    </Row>
                    <div className='d-flex justify-content-center '><button type='submit' className='btn btn-primary'>Submit Form</button></div>

                </Form>
            </Layout >
        </>
    )
}

export default DoctorApplicationForm