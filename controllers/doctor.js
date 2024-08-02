
const appModel = require("../models/appointment.js");
const doctorModel = require("../models/doctor.js")
const userModel = require("../models/user.js")

const getDocProfile = async (req, res) => {
    try {
        // console.log("here geting doc data: ");
        const doc = await doctorModel.findOne({ userId: req.body.userId });
        res.status(200).send({ success: true, message: 'Profile fetched successfully.', data: doc });
    } catch (error) {
        console.log(error);
        res.status(500).send({ success: false, message: 'Not able to get profile details', error: error.message });
    }

}

const updateDocProfile = async (req, res) => {
    try {
        // console.log("req.body");
        // console.log(req.body);
        const doc = await doctorModel.findOneAndUpdate({ userId: req.body.userId }, req.body);
        res.status(201).send({ success: true, message: 'Profile updated successfully.', data: doc });
    } catch (error) {
        console.log(error);
        res.status(500).send({ success: false, message: 'Not able to update profile', error: error.message });
    }

}

const getDocDetailsForAppointment = async (req, res) => {
    try {
        const doc = await doctorModel.findOne({ _id: req.body.doctorId });
        res.status(200).send({ success: true, message: 'Successfully fetched doc details', data: doc });


    } catch (error) {
        console.log(error);
        res.status(500).send({ success: false, message: 'Not able to get doc details for booking appointment', error: error.message });
    }
}

const getDocApps = async (req, res) => {
    try {
        // console.log("getdocapps");
        // console.log(req.body);


        const doc = await doctorModel.findOne({ userId: req.body.userId });
        const apps = await appModel.find({ doctorId: doc._id });
        res.status(200).send({
            success: true,
            message: 'Appointment Data fetched successfully.',
            data: apps
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({ success: false, message: 'Not able to fetch your appointments', error: error.message });
    }
}

const updateAppStatus = async (req, res) => {
    try {
        const { appId, status } = req.body;
        // console.log(appId);
        const app = await appModel.findByIdAndUpdate(appId, { status });
        // console.log(app);

        const user = await userModel.findOne({ _id: app.userId });
        const notifications = [...user.notifications, {
            type: 'Appointment Status Updated',
            message: `Appointment Status Updated`,
            onClickPath: '/doctor/appointments'
        }]
        const updatedUser = await userModel.findByIdAndUpdate({ _id: app.userId }, { notifications });
        res.status(200).send({
            success: true,
            message: 'Appointment Status Updated successfully.'
        })


    } catch (error) {
        console.log(error);
        res.status(500).send({ success: false, message: 'Not able to update appointment status', error: error.message });

    }
}

module.exports = { getDocProfile, updateDocProfile, getDocDetailsForAppointment, getDocApps, updateAppStatus }