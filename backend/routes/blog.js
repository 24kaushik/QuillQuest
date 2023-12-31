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
    body('title', 'Title must be shorter than 100 characters!').isLength({ max: 100 }),
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
        if (user) {
            const username = user.username;
            const blog = new Blog({ title, content, author: username, authorID: userID });
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

        if (blog) {
            return res.status(200).json({ success: true, blog })
        }

        res.status(404).json({ success: false, error: `No blog found` })

    } catch (error) {
        res.status(404).json({ success: false, error: `No blog found` })
    }

})

//Route 4: Get blogs of a user by id using: /getuserblog
Router.get('/getuserblog', fetchUser, async (req, res) => {
    try {
        // Finding a user with the userID
        const userID = req.user.id;
        if (userID) {
            const blogs = await Blog.find({ authorID: userID })
            if (blogs.length != 0) {
                return res.status(200).json({ success: true, blogs })
            }
            return res.status(404).send({ success: false, error: "No blogs found!" })
        }
        res.status(401).send({ success: false, error: "Please authenticate using a valid token!" })
    } catch (error) {
        res.status(500).json({ success: false, error: "Internal server error!" })
    }
})

//Route 5: Update an existing blog using: /update/:id .Login required
Router.post('/update/:id', [
    body('title', 'Title must be atleast 4 characters long!').isLength({ min: 4 }),
    body('title', 'Title must be shorter than 100 characters!').isLength({ max: 100 }),
    body('content', 'Content must be atleast 10 characters long!').isLength({ min: 10 }),
    body('content', 'Content must be shorter than 4000 characters!').isLength({ max: 4000 })
], fetchUser, async (req, res) => {
    try {
        const { title, content } = req.body;
        const blogID = req.params.id;
        if (!blogID) {
            return res.status(404).json({ success: false, error: "Please provide a valid blog id!" })
        }
        const userID = req.user.id;

        // Checking if title and content meets the required criteria.
        const newBlog = { title: req.body.title, content: req.body.content };
        const errors = validationResult(req)

        if (!errors.isEmpty()) {
            return res.status(400).json({ success: false, error: errors.array() })
        }

        // Checking if the blog is present.
        const findBlog = await Blog.findById(blogID).select()

        if (!findBlog) {
            return res.status(400).json({ success: false, error: "The blog does not exists." })
        } else if (findBlog.authorID != userID) {//Checking if the blog belongs to the user.
            return res.status(401).json({ success: false, error: "You are not the owner of the blog!" })
        }

        const updatedBlog = await Blog.findByIdAndUpdate(blogID, { $set: newBlog }, { new: true })
        res.status(200).json({ success: true, blog: updatedBlog })

    } catch (error) {
        console.log(error.message)
        res.status(500).json({ success: false, error: "Internal server error!" })
    }
})

//Route 6: Delete a blog using: /delete/:id . Login required!
Router.delete('/delete/:id', fetchUser, async (req, res) => {
    try {
        const blogID = req.params.id;
        const userID = req.user.id;

        //Checking if the blog exists.
        try {
            const blog = await Blog.findById(blogID);
            //Checking if the blog belongs to the user.
            if (blog.authorID != userID) {
                return res.status(401).json({ success: false, error: "You are not the owner of the blog." })
            }
        } catch (error) {
            return res.status(400).json({ success: false, error: "The blog does not exists." })
        }


        //Deleting the blog.
        const dBlog = await Blog.findByIdAndDelete(blogID);
        res.status(200).json({ success: true, message: 'The blog has been deleted successfully.' })

    } catch (error) {
        console.log(error.message)
        res.status(500).json({ success: false, error: "Internal server error!" })
    }
})


module.exports = Router;