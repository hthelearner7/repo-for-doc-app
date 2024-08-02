import React, { useEffect } from 'react'
import { Navigate } from 'react-router-dom'

import axios from 'axios'
import { useSelector, useDispatch } from 'react-redux';
import { showLoading, hideLoading } from '../redux/features/alertSlice';
import { setUser } from '../redux/features/userSlice';




const ProtectedRoute = ({ children }) => {

    const dispatch = useDispatch();
    // console.log(useSelector(state => state.user));
    const { user } = useSelector(state => state.user);
    // console.log(useSelector(state => state.user));
    // console.log(user);

    const getUser = async (req, res) => {
        try {
            // console.log("inside getUser() function:  ");
            dispatch(showLoading());
            const res = await axios.post('/api/v1/user/getUserData', {
                token: localStorage.getItem("token")
            },
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`
                    }
                })
            dispatch(hideLoading());

            // console.log(res);

            if (res.data.success) {
                // console.log("here");
                dispatch(setUser(res.data.data));
            } else {
                localStorage.clear();
                <Navigate to={'/login'} />
            }

        } catch (error) {
            localStorage.clear();
            dispatch(hideLoading());
            console.log(error);
        }
    }

    useEffect(() => {
        // console.log("useEffect");


        // console.log("user: " + user);
        // console.log(user);


        // console.log(user == null);
        // console.log(user);
        // if (user === null) {
        if (!user) {
            // console.log("useEffect");
            getUser();
        }
    }, [user, getUser])


    if (localStorage.getItem("token")) {
        return children
    } else {
        return <Navigate to={'/login'} />
    }

}

export default ProtectedRoute