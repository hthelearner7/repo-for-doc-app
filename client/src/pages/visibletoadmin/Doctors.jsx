
import React, { useState, useEffect } from 'react'


import Layout from './../../components/Layout';

import axios from 'axios';
import { message, Table } from 'antd';



const Doctors = () => {


    const [doctors, setDoctors] = useState([]);

    const getDoctors = async (req, res) => {
        try {

            const res = await axios.post('/api/v1/admin/getTheDoctorList', {
                apiMsg: "req changed"
            }, {

                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                }
            })

            if (res.data.success) {
                setDoctors(res.data.data);
            }


        } catch (error) {
            console.log(error);
        }

    }

    const handleAccountStatus = async (record, status) => {
        // console.log("handle acc status");
        try {
            // console.log(record);
            const res = await axios.post('/api/v1/admin/changeaccstatus', {
                doctorId: record._id,
                userId: record.userId,
                status: status,
            }, {

                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                }
            })

            if (res.data.success) {
                message.success(res.data.message);
                window.location.reload();
            } else {
                message.error(res.data.message);
            }
        } catch (error) {
            message.error(error.message);
        }


    }

    useEffect(() => {
        getDoctors();
    }, [])


    const columns = [
        // {
        //     title: 'First Name',
        //     key: 'fName',
        //     dataIndex: 'firstName'
        // },
        // {
        //     title: 'Last Name',
        //     key: 'lName',
        //     dataIndex: 'lastName'
        // },
        {
            title: 'Email',
            key: 'email',
            dataIndex: 'email'
        },
        // {
        //     title: 'Status',
        //     key: 'status',
        //     dataIndex: 'status'
        // },

        {
            title: 'Actions',
            key: 'actions',
            dataIndex: 'actions',
            render: (text, record) => (
                <div className="d-flex gap-2 flex-column">
                    {
                        record.status === 'pending' ?
                            <div>
                                <button
                                    onClick={() => handleAccountStatus(record, 'Accepted')}
                                    className='btn btn-success'>Yes</button>
                                <button
                                    onClick={() => handleAccountStatus(record, 'Rejected')}
                                    className='btn btn-danger'>No</button>
                            </div> : <span>{record.status}</span>
                    }
                </div>
            )


        },
    ]


    return (
        <Layout>
            <div>
                <h1>Doctors List</h1>
                <Table columns={columns} dataSource={doctors} />
            </div>
        </Layout>
    )
}

export default Doctors