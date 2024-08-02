const express = require("express");
// const colors = require("colors");
const dotenv = require("dotenv");
const morgan = require("morgan");
const connectToDB = require("./config/db");
// const cors = require("cors");
const path = require('path'); // to access __dirname


dotenv.config();

// mongodb conn
connectToDB();

const app = express();

// es 5 syntax

// use the client app
app.use(express.static(path.join(__dirname, './client/dist')))

// render client for any path
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, './client/dist/index.html'))
})
// console.log("dir");
// console.log(`${__dirname}`.bgBlue.white);

// console.log(__dirname, './client/dist/index.html');


//* middlewares
app.use(express.json()); //? to avoid json related errors
app.use(morgan('dev'));



//* routes

app.get('/', (req, res) => {
    res.status(200).send({
        message: "server running"
    })
})

// for users
app.use('/api/v1/user', require("./routes/user"));
app.use('/api/v1/admin', require("./routes/adminRoutes"));
app.use('/api/v1/doctor', require("./routes/doctor"));

const port = process.env.PORT || 8080;
app.listen(port, () => {
    // console.log(`server is running successfully Mode: ${process.env.NODE_MODE} on ${process.env.PORT} `.bgYellow.white);
    console.log(`server is running successfully`);
})
