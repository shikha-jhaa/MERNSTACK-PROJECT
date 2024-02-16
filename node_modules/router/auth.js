const jwt = require('jsonwebtoken');
const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const authenticate = require('../middleware/authenticate');
// const cookie = require("cookie-parser");


require('../db/conn');
const User = require("../model/userSchema");


// using promises
// router.post('/register', async (req, res) => {
//     const { name, email, phone, work, password, cpassword } = req.body;

//     if (!name || !email || !phone || !work || !password || !cpassword) {
//         return res.status(422).json({ error: 'Please fill all the fields properly' });
//     }
//     try { 
//         const userExist = await User.findOne({ email: email });
//         if (userExist) {
//             return res.status(422).json({ error: 'Email already exists' });
//         } else if (password !== cpassword){
//             return res.status(422).json({ error: 'Passwords do not match' });
//         } else {
//             const user = new User({ name, email, phone, work, password, cpassword });
//             await user.save();
//             res.status(201).json({ message: 'User registered successfully' });
//         }
//     } catch (err) {
//         console.error(err);
//         res.status(500).json({ error: 'Internal Server Error' });
//     }
// });
// login route
router.post('/signin', async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(422).json({ error: 'Please fill all the fields' });
        }

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ error: 'Invalid credentials' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ error: 'Invalid credentials' });
        }

        const token = await user.generateAuthToken();
        res.json({ token });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// about us page
router.get('/about', authenticate, (req, res) => {
    try {
        // Extract user data from req.user
        const { _id, name, email, work, phone } = req.user;

        // Send the desired user data in the response
        res.json({
            myId: _id,
            name,
            email,
            work,
            phone
        });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// get user data for contact us & home page
router.get("/getdata", authenticate, (req, res) => {
    console.log("hello my contact");
    // res.send(req.rootUser);
    const {name, email, phone } = req.user;

        // Send the desired user data in the response
        res.json({
            name,
            email,
            phone
        });
//     res.json({
//         userData: req.rootUser,
//         userId: req.userId
//     })
});
// // // contact us page
// router.post('/Contact', authenticate, async (req, res) => {
//     try {
//         const { name, email, phone, message } = req.body;
//         res.status(500).send('Server Error');
//         // Validate if all required fields are present
//         if (!name || !email || !phone || !message) {
//             console.log('error in contact form');
//             return res.status(400).json({ error: "Please fill out the contact form completely" });
//         }

//         // Access user ID from authenticated user object
//         const userId = req.user._id;

//         // Find the user in the database
//         const userContact = await User.findById(userId);

//         if (!userContact) {
//             return res.status(404).json({ error: 'User not found' });
//         }

//         // Add message to user's data
//         userContact.messages.push({ name, email, phone, message });

//         // Save the updated user data
//         await userContact.save();

//         return res.status(201).json({ message: 'Message sent successfully' });

//     } catch (error) {
//         console.log(error);
//         return res.status(500).json({ error: 'Internal server error' });
//     }
// });
router.post('/Contact', authenticate, async (req, res) => {
    try {
        const { name, email, phone, message } = req.body;

        // Validate if all required fields are present
        if (!name || !email || !phone || !message) {
            console.log('error in contact form');
            return res.status(400).json({ error: "Please fill out the contact form completely" });
        }

        // Access user ID from authenticated user object
        const userId = req.user._id;

        // Find the user in the database
        const userContact = await User.findById(userId);

        if (!userContact) {
            return res.status(404).json({ error: 'User not found' });
        }

        // Add message to user's data
        userContact.messages.push({ name, email, phone, message });

        // Save the updated user data
        await userContact.save();

        return res.status(201).json({ message: 'Message sent successfully' });

    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: 'Internal server error' });
    }
});
// logout page
router.get('/logout', authenticate, (req, res) =>{
        console.log("hello my logout page");
        res.cleartoken('Token',{path :"/"});
        res.status(200).send('User logout');
    
});
module.exports = router;

