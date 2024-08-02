const mongoose = require('mongoose');

// for doctor form
const doctorSchema = new mongoose.Schema({
    userId: {
        type: String,
    },
    firstName: {
        type: String,
        required: [true, 'first name is required']
    },
    lastName: {
        type: String,
        required: [true, 'first name is required']
    },
    phone: {
        type: String,
        required: [true, 'Phone Number is Required']
    },
    email: {
        type: String,
        required: [true, 'email is required']
    },
    website: {
        type: String,
    },
    address: {
        type: String,
        required: [true, 'Address is required']
    },
    specialization: {
        type: String,
        required: [true, 'Specialization is required']
    },
    experience: {
        type: String,
        required: [true, 'Experience Information is required']
    },
    feeInfo: {
        type: Number,
        required: [true, 'Fee Information is required']
    },
    status: {
        type: String,
        default: "pending"
    },
    timings: {
        type: Object,
        required: [true, 'Work Timing is required']
    }
},
    { timestamps: true }

)

const doctorModel = mongoose.model('doctors', doctorSchema);
module.exports = doctorModel;