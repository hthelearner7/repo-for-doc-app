const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'name is required']
    },
    email: {
        type: String,
        required: [true, 'email is required']
    },
    password: {
        type: String,
        required: [true, 'password is required']
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    isDoctor: {
        type: Boolean,
        default: false
    },
    notifications: {
        type: Array,
        default: []
    },
    seenNotifications: {
        type: Array,
        default: []
    },
});

const user = mongoose.model('users', userSchema);

module.exports = user;