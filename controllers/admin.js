const colors = require('colors')

const userModel = require("../models/user.js")
const doctorModel = require("../models/doctor.js")

const getAllUsers = async (req, res) => {
    try {
        // console.log("getting all users");
        // console.log(req.body);


        const users = await userModel.find({});
        res.status(200).send({
            success: true,
            message: 'User List displayed sucessfully',
            data: users
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({ success: false, message: "Error in fetching Users" })

    }

}
const getAllDoctors = async (req, res) => {
    try {
        // console.log("getting all doctors");
        // console.log(req.body);
        // console.log("here");

        const doctors = await doctorModel.find({});
        // console.log(doctors);

        res.status(200).send({
            success: true,
            message: 'Doctor List displayed sucessfully',
            data: doctors
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({ success: false, message: "Error in fetching Doctors" })

    }

}

const changeAccountStatus = async (req, res) => {
    try {
        // console.log("doctor");
        // console.log(req.body);
        const { doctorId, status } = req.body;
        let doctor = await doctorModel.findByIdAndUpdate(doctorId, { status });
        let userId = doctor.userId;
        // console.log(doctor);
        const user = await userModel.findOne({ _id: userId });
        const notifications = user.notifications;
        notifications.push({
            type: 'DoctorAccountReqUpdated',
            message: `Your Application has been ${status}`,
            onClickPath: '/notifcations'
        })
        let isDoc = status === 'Accepted' ? true : false;
        // console.log(`isDoc? ${isDoc}`.bgYellow.green);
        const updatedUser = await userModel.findByIdAndUpdate({ _id: userId }, { isDoctor: isDoc, notifications });
        res.status(200).send({ success: true, message: 'Account Status Updated', updatedUser })

    } catch (error) {
        console.log(`err`.bgRed.white);
        console.log(error);

        res.status(500).send({ success: false, message: "Error in changing Account Status" })


    }


}

module.exports = { getAllUsers, getAllDoctors, changeAccountStatus };