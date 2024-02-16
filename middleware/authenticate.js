
const jwt = require('jsonwebtoken');
const User = require("../model/userSchema");
const express = require('express')
const router = express.Router();

const authenticate = async (req, res, next) => {
    try {
        // Check if 'Authorization' header exists
        const authHeader = req.header('Authorization');
        console.log(authHeader)
        if (!authHeader) {
            throw new Error('Authorization header is missing');
        }

        // Extract token from 'Authorization' header
        const token = authHeader && authHeader.split(' ')[1];
        if (!token) {
            throw new Error('Token is missing');
        }

        // Verify token
        const decoded = jwt.verify(token, process.env.SECRET_KEY);

        // Find user in database
        const user = await User.findById(decoded._id);
        console.log(user,'this is user');
        if (!user) {
            throw new Error('User not found');
        }

        // Attach token and user data to request object
        req.token = token;
        req.user = user;
        req.UserID = user._id;

        // Call next middleware
        next();
       
    } catch (err) {
        console.error(err.message,'ertrrtrrrr');
        res.status(401).json({ error: 'Unauthorized' });
    }
};

module.exports = authenticate;












