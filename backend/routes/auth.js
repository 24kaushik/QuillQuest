const express = require('express');
const { body, validationResult } = require('express-validator');
require('dotenv').config();
const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const fetchUser = require('../middleware/fetchUser')
const Router = express.Router();


const JWT_SECRET = process.env.JWT_SECRET;


//Route 0: Test route: /auth/test . No login required.
Router.use('/test', (req, res) => {
    res.status(200).send("This route is working")
})


//Route 1: Create user using: /auth/createuser . No login required.
Router.post("/createuser", [
    body('name', 'Enter a valid name').isLength({ min: 3 }),
    body('username', 'Enter a valid username').isLength({ min: 3 }),
    body('password', 'Password must be atleast 5 characters!').isLength({ min: 5 }),
], async (req, res) => {

    let success = false;

    // Checking if name, username, password fits the criteria

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({ error: errors.array() })
    }

    try {
        // Checking weather a user with same username exists
        let user = await User.findOne({ username: req.body.username });

        if (user) {
            return res.status(400).json({ error: "Sorry, a user with this username already exists." });
        }

        // Securing the password by adding salt and hashing
        let salt = await bcrypt.genSalt(10);
        let securePass = await bcrypt.hash(req.body.password, salt);

        // Creating a user with the given credentials
        user = await User.create({
            name: req.body.name,
            username: req.body.username,
            password: securePass
        })

        // Making an auth token from the user id

        let data = {
            user: { id: user._id }
        }

        const authToken = jwt.sign(data, JWT_SECRET);
        success = true;

        res.status(200).json({ success, authToken })

    } catch (error) {
        success = false
        console.log(error.message)
        return res.status(500).json({ success, error: "Internal server error!" });
    }
})

// Route 2: Authenticate the user using: /login . No login required.
Router.post('/login', [
    body('username', 'Username cannot be blank').exists(),
    body('password', "Password cannot be blank").exists()
], async (req, res) => {

    let success = false;

    // Checking if name, username, password fits the criteria

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({ error: errors.array() });
    }

    try {
        // Finding user in the database (if exists) and returning the auth token
        let { username, password } = req.body;

        let user = await User.findOne({ username: username });

        if (!user) {
            success = false;
            return res.status(401).json({ success, error: "Please try to login with correct credentials!" });
        }

        const passwordCompare = await bcrypt.compare(password, user.password);

        if (!passwordCompare) {
            success = false;
            return res.status(401).json({ success, error: "Please try to login with correct credentials!" });
        }

        // Creating an auth-token from user id
        const data = {
            user: { id: user.id }
        }

        const authToken = jwt.sign(data, JWT_SECRET)
        success = true
        res.status(200).json({ success, authToken })

    } catch (error) {
        success = false;
        console.log(error.message)
        res.status(500).json({ success, error: "Internal server error!" })
    }

})

// Route 3: Getting the user data using: /getuser . Login required
Router.post('/getuser', fetchUser, async (req, res) => {
    let success = false
    try {
        // Finding a user with the userID
        const userID = req.user.id;
        const user = await User.findById(userID).select('-password');
        if (user) {
            success = true;
            return res.status(200).json({ success, user });
        }
        res.status(401).send({ error: "Please authenticate using a valid token!" })

    } catch (error) {
        success = false;
        console.log(error.message);
        res.status(500).json({ success, error: "Internal server error!" })
    }
})

module.exports = Router