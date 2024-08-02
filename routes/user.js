const express = require('express');
const { loginController, registerController, authenticationController, applyDoctorCont, getAllNotificationsController, deleteAllNotifications, getAllDoctors, bookApptWDoc, checkingDocAvailability, allAppsByAUser } = require('../controllers/user');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

// routes
router.post("/login", loginController)
router.post("/register", registerController)

// for Authentication
router.post('/getUserData', authMiddleware, authenticationController)


// apply doctor
router.post('/apply-doctor', authMiddleware, applyDoctorCont)

// for displaying unread and read notifications
router.post('/getAllNotifications', authMiddleware, getAllNotificationsController)
// del read notifications
router.post('/deleteAllNotifications', authMiddleware, deleteAllNotifications)

// get doc list
router.post('/getAllDoctors', authMiddleware, getAllDoctors)

// book appointment
router.post('/bookAppt', authMiddleware, bookApptWDoc)

// checking availability
router.post('/checking-doc-availability', authMiddleware, checkingDocAvailability)

// appointments list // ?doubt here
router.post('/all-appointments', authMiddleware, allAppsByAUser)


module.exports = router;