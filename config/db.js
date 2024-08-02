const mongoose = require('mongoose');
const colors = require('colors');

const connectToDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL);
        // console.log(`MongoDB connected ${mongoose.connection.host}`.bgGreen.white);
        console.log(`MongoDB connected successfully`);

    } catch (e) {
        console.log(`MongoDB Server Issue ${e}`.bgRed.white);
    }
}

module.exports = connectToDB;