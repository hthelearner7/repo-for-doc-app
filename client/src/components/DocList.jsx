import React from 'react'

import moment from 'moment';
import { useNavigate } from 'react-router-dom';


const DocList = ({ doc }) => {
    const date = doc.timings[0];
    const navigate = useNavigate();

    return (
        <>

            <div className="btn card m-2 text-center p-4" onClick={() => navigate(`/doctor/book-appointment/${doc._id}`)}>
                <div className="card-title">
                    <h6>Dr. {doc.firstName + " " + doc.lastName}</h6>
                    <hr />
                </div>
                <div className="card-body">
                    <p className='card-subtitle'><strong>Specialization: {doc.specialization.toUpperCase()}</strong></p>
                    <p className='card-subtitle'><strong>Experience:{doc.experience} Years</strong></p>
                    <p className='card-text pt-2'><strong>Timings:{moment(doc.timings[0]).format("HH:mm")} to {moment(doc.timings[1]).format("HH:mm")}</strong></p>
                    <p className='card-text'><strong>Fee: Rs.{doc.feeInfo}</strong></p>
                </div>
            </div>
        </>
    )
}

export default DocList