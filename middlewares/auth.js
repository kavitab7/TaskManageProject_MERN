const JWT = require('jsonwebtoken');
const userModel = require('../models/user')

const requireSignIn = async (req, res, next) => {
    try {
        const decode = await JWT.verify(req.headers.authorization, process.env.JWT_SECRET);
        req.user = decode;
        next();
    } catch (error) {
        console.log(error)
    }
}

module.exports = requireSignIn