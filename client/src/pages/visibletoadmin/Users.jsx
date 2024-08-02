
import React, { useState, useEffect } from 'react'


import Layout from './../../components/Layout';

import axios from 'axios';
import { Table } from 'antd';



const Users = () => {


    const [users, setUsers] = useState([]);

    const getUsers = async (req, res) => {
        try {

            const res = await axios.post('/api/v1/admin/getTheUserList', { apiMsg: "req changed" }, {

                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                }
            })

            if (res.data.success) {
                setUsers(res.data.data);
            }


        } catch (error) {
            console.log(error);
        }

    }

    useEffect(() => {
        getUsers();
    }, [])


    const columns = [
        // {
        //     title: 'Name',
        //     key: 'name',
        //     dataIndex: 'name'
        // },
        {
            title: 'Email',
            key: 'email',
            dataIndex: 'email'
        },
        {
            title: 'Doctor',
            key: 'doctor',
            dataIndex: 'isDoctor',
            render: (text, record) => {
                return <span>{record.isDoctor ? 'Yes' : 'No'}</span>

            }
        },

    ]


    return (
        <Layout>
            <div>
                <h1>Users List</h1>
                <Table columns={columns} dataSource={users} />
            </div>
        </Layout>
    )
}

export default Users