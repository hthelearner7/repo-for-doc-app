import { React, useState, useEffect } from 'react'
import axios from 'axios'

import { Col, message, Row } from "antd";
import Layout from '../components/Layout';
import DocList from '../components/DocList';


const HomePage = () => {

    const [doctors, setDoctors] = useState([]);

    // const [userName, setUserName] = useState('');

    // login user data
    const getUserData = async () => {
        try {
            const res = await axios.post('/api/v1/user/getAllDoctors', {
                apimsg: "req change successful"
            }, {
                headers: {
                    Authorization: "Bearer " + localStorage.getItem("token")
                }
            })
            if (res.data.success) {
                setDoctors(res.data.data);
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
            <h1 className='text-center p-2'>Doctors:</h1>
            <h2 className='text center p-2 bg-primary'>Click on the Card below to go to the Doctor Booking Page</h2>
            <Row>
                {doctors && doctors.map((doc, idx) => {
                    return <DocList key={idx} doc={doc}></DocList>
                })}
            </Row>
        </Layout>
    )
}

export default HomePage