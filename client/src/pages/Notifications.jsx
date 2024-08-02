import React from 'react'
import Layout from './../components/Layout';
import { Tabs } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { message } from 'antd';

import { showLoading, hideLoading } from '../redux/features/alertSlice';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Notifications = () => {

    const dispatch = useDispatch();

    const navigate = useNavigate();

    const { user } = useSelector(state => state.user);



    const handleMarkAllAsRead = async (req, res) => {
        try {
            dispatch(showLoading());
            const res = await axios.post('/api/v1/user/getAllNotifications', { userId: user._id },
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`
                    }
                }
            );
            if (res.data.success) {
                message.success(res.data.message);
                window.location.reload();
            } else {
                message.error('Not able to fetch notifications');
            }
            dispatch(hideLoading());
        } catch (error) {
            dispatch(hideLoading());
            console.log(error);
            message.error(error.message);
        }

    }



    const handleDeleteAllNotifications = async (req, res) => {
        try {
            dispatch(showLoading());
            const res = await axios.post('/api/v1/user/deleteAllNotifications', { userId: user._id },
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`
                    }
                }
            );
            if (res.data.success) {
                message.success(res.data.message);
                window.location.reload();

            } else {
                message.error('Not able to delete read notifications');
            }
            dispatch(hideLoading());
        } catch (error) {
            dispatch(hideLoading());
            console.log(error);
            message.error(error.message);
        }

    }


    const items = [
        {
            key: '0',
            label: 'Unread',
            children:
                <div>
                    <div className='text-black d-flex justify-content-end'>
                        <h6 className='btn btn-success' onClick={handleMarkAllAsRead}>Mark All as Read</h6>
                    </div>
                    {/* {console.log(user?.notifications)} */}
                    {
                        user?.notifications.map((msg, idx) => (
                            <div key={idx} className="card btn" onClick={() => navigate(msg.data.onClickPath)}>
                                <div className="card-text">
                                    {msg.message}
                                </div>
                            </div>
                        ))
                    }
                </div>
            ,
        },
        {
            key: '1',
            label: 'Read',
            children: <div>
                <div className='text-black d-flex justify-content-end'>
                    <h6 className='btn btn-danger' onClick={handleDeleteAllNotifications}>Delete All</h6>
                </div>
                {
                    user?.seenNotifications.map((msg, idx) => (
                        <div key={idx} className="card btn" onClick={() => navigate(msg.onClickPath)}>
                            <div className="card-text">
                                {msg.message}
                            </div>
                        </div>
                    ))
                }
            </div>,
        },
    ];


    return (
        <>
            <Layout>
                <div className='m-3 w-auto'>
                    <h1 className='text-center'>Notifications</h1>

                    {
                        <Tabs defaultActiveKey="0" items={items} />
                    }
                </div>
            </Layout>
        </>
    )
}

export default Notifications