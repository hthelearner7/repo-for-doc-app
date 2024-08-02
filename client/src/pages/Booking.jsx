import React, { useEffect, useState } from 'react'
import Layout from '../components/Layout'
import axios from 'axios';
import { useParams } from 'react-router-dom';
import moment from 'moment';
import { DatePicker, TimePicker, message } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { showLoading, hideLoading } from '../redux/features/alertSlice';



const Booking = () => {

    const { user } = useSelector(state => state.user);

    const dispatch = useDispatch();

    const [doc, setDoc] = useState();
    const params = useParams();

    const [date, setDate] = useState("");
    const [time, setTime] = useState("");
    const [isAvailable, setIsAvailable] = useState();

    const handleBooking = async () => {
        try {
            if (!date && !time) {
                return alert("Date & Time Required");
            }
            dispatch(showLoading());
            const res = await axios.post('/api/v1/user/bookAppt',
                {
                    doctorId: params.doctorId,
                    userId: user._id,
                    doctorInfo: doc,
                    date: date,
                    time: time,
                    userInfo: user
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
            } else {
                message.error(res.data.message)
            }

        } catch (error) {
            dispatch(hideLoading());
            console.log(error);
        }

    }

    const checkAvailability = async (req, res) => {
        try {
            if (!date && !time) {
                return alert("Date & Time Required");
            }
            // console.log(date);
            // console.log(time);
            dispatch(showLoading());
            const res = await axios.post('/api/v1/user/checking-doc-availability', {
                doctorId: params.doctorId,
                date: date,
                time: time,
            }, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                }
            })
            dispatch(hideLoading());

            if (res.data.success) {
                // console.log("isaval");
                // console.log(isAvailable);
                setIsAvailable(true);
                // console.log(isAvailable);
                message.success(res.data.message);
            } else {
                message.error(res.data.message);
            }
        } catch (error) {
            dispatch(hideLoading());
            console.log(error);
        }
    }


    const getUserData = async () => {
        try {
            const res = await axios.post('/api/v1/doctor/getdocdetailsforappointment/', { doctorId: params.doctorId }, {
                headers: {
                    Authorization: "Bearer " + localStorage.getItem("token")
                }
            })
            if (res.data.success) {
                setDoc(res.data.data);
            }
        } catch (error) {
            console.log(error);
            message.error(error.message)

        }
    }


    useEffect(() => {
        getUserData();
    }, [])


    return (
        <Layout>
            <h1 className='text-center m-2'>Booking</h1>
            <div className='m-5'>
                {
                    doc && (
                        <div>
                            {/* doc details */}
                            <h6>Dr. {doc.firstName + " " + doc.lastName}</h6>
                            <hr />
                            <p>Specialization: {doc.specialization.toUpperCase()}</p>
                            <p> Experience: {doc.experience} Years</p>
                            <p>Timings: {moment(doc.timings[0]).format("HH:mm")} to {moment(doc.timings[1]).format("HH:mm")}</p>
                            <p> Fee: Rs.{doc.feeInfo}</p>

                            {/* decide date and time */}
                            <div className='d-flex flex-column gap-3 mt-2 mb-4 justify-content-center align-items-start'>
                                {/* <DatePicker format="DD-MM-YYYY"
                                    onChange={(date) => {
                                        setDate(moment(date).format("DD-MM-YYYY"))
                                    }}
                                />
                                <TimePicker format="HH:mm"
                                    onChange={(time) => {
                                        setTime(moment(time[0]).format("HH:mm"))
                                    }}
                                /> */}
                                <h4>Date:</h4>
                                <input
                                    type="text"
                                    placeholder="DD-MM-YYYY"
                                    onChange={(e) => setDate(e.target.value)}
                                    style={{ width: "95%" }}

                                    className='card'
                                />
                                for e.g. 15-02-2024"

                                <h4>Time:</h4>
                                <input
                                    type="text"
                                    placeholder="HH:mm"
                                    onChange={(e) => setTime(e.target.value)}


                                    className='w-50 card'
                                />
                                for example:  18:23"



                                <button
                                    onClick={checkAvailability}
                                    className='btn btn-info'>Check for Availability</button>

                                <button
                                    onClick={handleBooking}
                                    className='btn btn-primary'>Book Now</button>
                            </div>

                        </div>


                    )
                }

            </div>
        </Layout>
    )
}

export default Booking