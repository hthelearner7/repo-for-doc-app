const userModel = require("../models/user.js");
const appModel = require("../models/appointment.js");

const moment = require('moment');

const bcrypt = require("bcryptjs")

const colors = require('colors');


// for generating token
const jwt = require("jsonwebtoken");

const doctorModel = require("../models/doctor.js");

const registerController = async (req, res) => {
    try {


        const { name, email, password } = req.body;

        let user = await userModel.findOne({ email }); // as email is unique

        if (user) {
            // console.log(user);
            // req is okay but user already exists
            return res.status(200).send({ success: false, message: "User already registered" })
        }

        // using bcrypt to generate salt for hashing password value
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        user = userModel.create({ name, email, password: hashedPassword });
        res.status(201).send({ success: true, message: "Registered Successfully" });

    } catch (error) {
        console.log(error);
        res.status(500).send({ success: false, message: `RegisterControllerError:  ${error.message}` })
    }

}

const loginController = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await userModel.findOne({ email });

        if (!user) {
            return res.status(200).send({ success: false, message: "User Not Found" })
        }

        const isPasswordMatching = await bcrypt.compare(password, user.password);

        if (!isPasswordMatching) {
            return res.status(200).send({ success: false, message: "Invalid email or password" });
        }



        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.status(200).send({ success: true, message: "Login Successful", token })
    } catch (error) {
        console.log(error);
        res.status(500).send({ success: false, message: `LoginControllerError:  ${error.message}` })
    }
}

const authenticationController = async (req, res) => {
    try {
        const user = await userModel.findById({ _id: req.body.userId });

        user.password = undefined;
        // console.log(user);
        if (!user) {
            return res.status(200).send({ success: false, message: "User Not Found" });
        } else {
            // console.log(user);
            res.status(200).send({
                success: true,
                data: user
            })
        }
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false, message: 'Authentication Error', error
        })
    }
}

const applyDoctorCont = async (req, res) => {
    try {
        // console.log(req.body);
        const newDoctor = new doctorModel({ ...req.body, status: 'pending' })
        doctorModel.create(newDoctor);
        // console.log("new doctor");
        // console.log(newDoctor);
        const adminUser = await userModel.findOne({ isAdmin: true })
        // console.log(adminUser);
        const notifications = adminUser.notifications;
        // console.log(notifications);
        notifications.push(
            {
                type: 'Apply Doctor Request',
                message: `${newDoctor.firstName} ${newDoctor.lastName} has applied for a Doctor Account.`,
                data: {
                    doctorId: newDoctor._id, // _id from newDoctor object
                    name: newDoctor.firstName + " " + newDoctor.lastName,
                    onClickPath: '/admin/doctors'
                }
            }
        )
        // console.log(notifications);
        await userModel.findByIdAndUpdate(adminUser._id, { notifications })
        // console.log("after findbyidandupdate");
        res.status(201).send({ success: true, message: "New Doctor Applied Successfully" })

    } catch (error) {
        console.log(error);
        res.status(500).send({ success: false, message: 'Can not apply as a doctor', error: error.message })
    }

}


const getAllNotificationsController = async (req, res) => {
    try {
        const user = await userModel.findOne({ _id: req.body.userId });
        const notifications = user.notifications;
        const seenNotifications = user.seenNotifications;
        seenNotifications.push(...notifications);
        // user.notifications  = [];
        // user.seenNotifications = notifications;
        // const updateUser = userModel.create
        const updatedUser = await userModel.findByIdAndUpdate(req.body.userId, { notifications: [], seenNotifications: seenNotifications })
        res.status(200).send({ success: true, message: "All Notifications are marked as read", data: updatedUser })
    } catch (error) {
        console.log(error);
        res.status(500).send({ success: false, message: 'Can not mark all the notifications as read', error: error.message })
    }


}

const deleteAllNotifications = async (req, res) => {
    try {
        // const user = await userModel.findOne({ _id: req.body.userId });

        const updatedUser = await userModel.findByIdAndUpdate(req.body.userId, { seenNotifications: [] })
        updatedUser.password = undefined;
        res.status(200).send({ success: true, message: "All Read Notifications are marked as deleted", data: updatedUser })
    } catch (error) {
        console.log(error);
        res.status(500).send({ success: false, message: 'Can not clear notifications', error: error.message })
    }

}

const getAllDoctors = async (req, res) => {
    try {
        // console.log("getting all doctors");
        // console.log(req.body);


        const doctors = await doctorModel.find({ status: 'Accepted' });
        res.status(200).send({ success: true, data: doctors });
    } catch (error) {
        console.log(error);
        res.status(500).send({ success: false, message: 'cannot fetch doctors list at the moment', error: error.message })
    }

}

const bookApptWDoc = async (req, res) => {
    try {
        req.body.date = moment(req.body.date, "DD-MM-YYYY").toISOString();
        req.body.time = moment(req.body.time, "HH-mm").toISOString();
        req.body.status = 'pending';
        const newApp = appModel.create(req.body);
        const user = await userModel.findOne({ _id: req.body.doctorInfo.userId });
        const notifications = [...user.notifications, {
            type: 'New-App-Req',
            message: `A new appointment request from ${req.body.userInfo.name}`,
            onClickPath: '/user/appointments'
        }]
        const updatedUser = await userModel.findByIdAndUpdate(req.body.doctorInfo.userId, { notifications });
        res.status(200).send({ success: true, message: "Appointment Request Sent to the Doctor" })

    } catch (error) {
        console.log(error);
        res.status(500).send({ success: false, message: 'cannot book appointment with the doctor at the moment', error: error.message })
    }
}

const checkingDocAvailability = async (req, res) => {
    try {
        // console.log("date".bgBlue.white);
        // console.log(req.body.date);
        // console.log(req.body.date.toISOString());
        // console.log("time".bgBlue.white);
        // console.log(req.body.time);
        // console.log(req.body.time.toISOString());
        const date = moment(req.body.date, 'DD-MM-YYYY').toISOString();
        const fromTime = moment(req.body.time, 'HH:mm').subtract(1, 'hours').toISOString();
        const toTime = moment(req.body.time, 'HH:mm').add(1, 'hours').toISOString();
        // console.log("all details".bgBlue.white);
        // console.log(date, ", ", fromTime, ", ", toTime);
        const doctorId = req.body.doctorId;
        const appointments = await appModel.find({
            doctorId,
            date,
            time: {
                $gte: fromTime,
                $lte: toTime,
            },
        });

        if (appointments.length > 0) {
            return res.status(200).send({
                message: "Appointments not Availibale at this time",
                success: false,
            });
        } else {
            return res.status(200).send({
                success: true,
                message: "Appointments available",
            });
        }


    } catch (error) {
        console.log(error);
        res.status(500).send({ success: false, message: 'booking error', error: error.message })
    }

}

const allAppsByAUser = async (req, res) => {
    try {
        // console.log(`req.body`.bgGreen.white);
        // console.log(req.body);

        const apps = await appModel.find({ userId: req.body.userId });
        res.status(200).send({ success: true, message: 'Fetched user appointments successfully.', data: apps });
    } catch (error) {
        console.log(error);
        res.status(500).send({ success: false, message: 'error in fetching user appointments', error: error.message })
    }
}

module.exports = { loginController, registerController, authenticationController, applyDoctorCont, getAllNotificationsController, deleteAllNotifications, getAllDoctors, bookApptWDoc, checkingDocAvailability, allAppsByAUser };