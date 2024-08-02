import React, { useEffect, useState } from 'react'

import Layout from '../components/Layout'
import axios from 'axios';
import { message, Table } from 'antd';
import moment from 'moment';
const UserAppointments = () => {


    const [allApps, setAllApps] = useState([]);



    const getAllApps = async (req, res) => {
        try {
            const res = await axios.post('/api/v1/user/all-appointments', { msg: "get chenged to post" }, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                }
            })
            if (res.data.success) {
                setAllApps(res.data.data);
                message.success('All appointments fetched successfully')
            } else {
                // console.log(res);
                message.error('Not able to fetch appointments');
            }
        } catch (error) {
            console.log(error);
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
        {
            key: 'status',
            title: 'Status: ',
            dataIndex: 'status',
        },
        // {
        //     key: 'id',
        //     title: 'ID',
        //     dataIndex: '_id',
        // },

    ]


    return (
        <Layout>
            <div >
                <h1>All Appointments</h1>
                <Table key={'table'} columns={cols} dataSource={allApps} />
            </div>
        </Layout>
    )
}

export default UserAppointments