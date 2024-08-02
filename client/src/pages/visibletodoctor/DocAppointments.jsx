import React, { useId } from 'react'
import Layout from '../../components/Layout'

import { useEffect, useState } from 'react'


import axios from 'axios';
import { message, Table } from 'antd';
import moment from 'moment';

const DocAppointments = () => {

    const [allApps, setAllApps] = useState([]);


    const getAllApps = async (req, res) => {
        try {
            const res = await axios.post('/api/v1/doctor/doc-apps', { apimsg: "req change" }, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                }
            })
            if (res.data.success) {
                setAllApps(res.data.data);
                message.success('All appointments fetched successfully')
            } else {
                message.error('Not able to fetch appointments');
            }
        } catch (error) {
            console.log(error);
        }

    }

    const handleStatus = async (record, status) => {
        try {
            const res = await axios.post('/api/v1/doctor/update-app-status', {
                appId: record._id, status
            }, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                }
            })
            if (res.data.success) {
                message.success('Status updated successfully');
                getAllApps();
            } else {
                message.error('Unable to update status');
            }
        } catch (error) {
            console.log(error);
            message.error(error.message);
        }


    }

    useEffect(() => {
        getAllApps();
    }, [])

    const cols = [
        {
            key: 'dnt',
            title: 'Date, Time',
            dataIndex: 'date',
            render: (text, record) => (
                <>
                    <span key={'time-span'}>
                        {moment(record.date).format('DD-MM-YYYY')} , {moment(record.time).format('HH:mm')}
                    </span>
                </>
            )

        },
        // {
        //     key: 'status',
        //     title: 'Status: ',
        //     dataIndex: 'status'
        // },
        {
            key: 'actions',
            title: 'Actions: ',
            dataIndex: 'actions',
            render: (text, record) => (
                <div key={'btn-div'}>
                    {
                        record?.status === 'pending' ?
                            <div key={'btns'} className='d-flex gap-1 flex-column'>
                                <button key={'btn0'} onClick={() => handleStatus(record, 'Accepted')} className='btn btn-success' >Yes</button>
                                <button key={'btn1'} onClick={() => handleStatus(record, 'Rejected')} className='btn btn-danger'>No</button>
                            </div>
                            : <span>{record.status}</span>
                    }
                </div>
            )
        },
        // {
        //     key: 'id',
        //     title: 'ID',
        //     dataIndex: '_id'
        // },
    ]


    return (
        <Layout>
            <div className=''>
                <h1>All Appointments</h1>
                <Table key='table' className='fs-6' columns={cols} dataSource={allApps} />
            </div>
        </Layout>
    )
}

export default DocAppointments;