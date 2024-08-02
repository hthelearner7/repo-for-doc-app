const express = require('express');

const { getDocProfile, updateDocProfile, getDocDetailsForAppointment, getDocApps, updateAppStatus } = require("../controllers/doctor.js")

const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

//  doc profile
router.post('/get-doc-profile', authMiddleware, getDocProfile)
router.post('/update-doc-profile', authMiddleware, updateDocProfile)


// booking appointment with doc
router.post('/getdocdetailsforappointment', authMiddleware, getDocDetailsForAppointment)

router.post('/doc-apps', authMiddleware, getDocApps)

router.post('/update-app-status', authMiddleware, updateAppStatus)

module.exports = router;