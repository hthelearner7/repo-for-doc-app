const JWT = require('jsonwebtoken');
const colors = require('colors');

module.exports = async (req, res, next) => {


    try {
        // console.log("Header".bgBlue.white);
        // console.log(req.headers);
        const token = req.headers['authorization'].split(" ")[1] //* header is set in the front end
        JWT.verify(token, process.env.JWT_SECRET, (err, decoded) => {
            if (err) {
                return res.status(200).send({ success: false, message: 'Auth Failed' });
            } else {
                req.body.userId = decoded.id;
                next();
            }
        })

    } catch (error) {
        console.log(error);
        res.status(401).send({ success: false, message: 'Auth Failed' })

    }

}