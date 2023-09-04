const express = require('express');
const fetchUser = require('../middleware/fetchUser');
const { body, validationResult } = require('express-validator')
const Blog = require('../models/Blog')
const User = require('../models/User')
const Router = express.Router();

// Route 0: Test route. /test 
Router.use('/test', (req, res) => { res.status(200).send('This route is working.') })

// Route 1: Fetching all the Blogs using: /fetchall . No login required.
Router.get('/fetchall', async (req, res) => {
    try {
        // Fetching all the blogs
        const blogs = await Blog.find();
        res.status(200).json({ success: true, blogs })
    } catch (error) {
        console.log(error.message)
        res.status(500).json({ success: false, error: "Internal server error!" })
    }
})

//Route 2: Creating a Blog using: /create . Login required
Router.post('/create', fetchUser, [
    body('title', 'Title must be atleast 4 characters long!').isLength({ min: 4 }),
    body('title', 'Title must be shorter than 50 characters!').isLength({ max: 50 }),
    body('content', 'Content must be atleast 10 characters long!').isLength({ min: 10 }),
    body('content', 'Content must be shorter than 4000 characters!').isLength({ max: 4000 })
], async (req, res) => {
    try {
        const { title, content } = req.body;

        // Checking if title and content meets the required criteria.
        const errors = validationResult(req)

        if (!errors.isEmpty()) {
            return res.status(400).json({ success: false, error: errors.array() })
        }

        // Checking if the blog is duplicate.
        const findBlog = await Blog.findOne({ title, content });

        if (findBlog) {
            return res.status(400).json({ success: false, error: "The same blog already exists." })
        }

        // Creating the blog and saving it into the database.
        const userID = req.user.id;
        const user = await User.findById(userID).select('-password');
        if(user){
            const username = user.username;
        const blog = new Blog({ title, content, author: username });
        const saveBlog = await blog.save();
        return res.status(200).json({ success: true, blog: saveBlog });
        }
        res.status(401).send({ error: "Please authenticate using a valid token!" })

    } catch (error) {
        console.log(error.message)
        res.status(500).json({ success: false, error: "Internal server error!" })
    }

})

// Route 3: Get Blog by id using: /getblog:id
Router.get('/getblog/:id', async (req, res) => {
    try {
        //Searching the blog using the id given in uri
        const blogID = req.params.id;
        const blog = await Blog.findById(blogID).select();

        if(blog){
            return res.status(200).json({success: true, blog})
        }

        res.status(404).json({success:false, error: `No blog found`})

    } catch (error) {
        res.status(404).json({success:false, error: `No blog found`})
    }

})

module.exports = Router;