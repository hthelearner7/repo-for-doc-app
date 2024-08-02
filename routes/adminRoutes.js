const express = require('express');
const authMiddleware = require('../middlewares/authMiddleware');
const router = express.Router();

const { getAllUsers, getAllDoctors, changeAccountStatus } = require('../controllers/admin');

router.post('/getTheUserList', authMiddleware, getAllUsers)
router.post('/getTheDoctorList', authMiddleware, getAllDoctors)
router.post('/changeaccstatus', authMiddleware, changeAccountStatus)

module.exports = router;