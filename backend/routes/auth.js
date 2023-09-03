const express = require('express');
const Router = express.Router();
const User = require('../models/User');
const { body, validationResult } = require('express-validator');


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

    const errors = validationResult(req);

    if(!errors.isEmpty()){
        return res.status(400).json({error: errors.array()})
    }

    res.status(200).send(req.body)

})

module.exports = Router