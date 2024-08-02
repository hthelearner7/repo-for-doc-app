import React from 'react'

import { useSelector } from 'react-redux';
import Layout from '../components/Layout';



const UserAndAdminProfile = () => {
    const { user } = useSelector(state => state.user);
    // console.log(user);
    return (
        <Layout>
            <div className='mt-4 d-flex flex-column justify-content-center align-items-center'>
                <h1 className='text-center'>Profile</h1>
                <div className='d-flex justify-content-center flex-column align-items-center card mt-2 p-2 rounded border-2 border-primary w-80'>
                    <div className='p-4 mb-4 border-2 bg-primary bg-gradient rounded'><i className='fa-solid fa-user fs-1'></i></div>
                    <p>Name: {user && user.name}</p>
                    <p>Email: {user && user.email}</p>
                    <p>Unread Notifications: {user?.notifications.length}</p>
                    <p>Account Type: {user?.isAdmin ? 'admin' : user?.isDoctor ? 'doctor' : 'normal user'}</p>

                </div>
            </div>
        </Layout>
    )
}

export default UserAndAdminProfile