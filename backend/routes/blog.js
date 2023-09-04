const express = require('express');
const fetchUser = require('../middleware/fetchUser');
const { body, validationResult } = require('express-validator')
const Blog = require('../models/Blog')
const User = require('../models/User')
const Router = express.Router();

// Route 0: Test route. /test 
Router.use('/test', (req, res) => { res.status(200).send('This route is working.') })

//Route 2: Creating a Blog using: /create . Login required
Router.post('/create', fetchUser, [
    body('title', 'Title must be atleast 4 characters long!').isLength({ min: 4 }),
    body('content', 'Content must be atleast 10 characters long').isLength({ min: 10 })
], async (req, res) => {
    try {
        const { title, content } = req.body;

        // Checking if title and content meets the required criteria.
        const errors = validationResult(req)

        if (!errors.isEmpty()) {
            return res.status(400).json({ success: false, error: errors.array })
        }

        // Checking if the blog is duplicate.
        const findBlog = await Blog.findOne({ title, content });

        if (findBlog) {
            return res.status(400).json({ success: false, error: "The same blog already exists." })
        }

        // Creating the blog and saving it into the database.
        const userID = req.user.id;
        const user = await User.findById(userID).select('-password');
        const username = user.username;
        const blog = new Blog({ title, content, author: username });
        const saveBlog = await blog.save();
        return res.status(200).json({ success: true, blog: saveBlog });

    } catch (error) {
        console.log(error.message)
        res.status(500).json({ success: false, error: "Internal server error!" })
    }

})

module.exports = Router;