const express = require('express');
const router = express.Router() 
const session = require('express-session')
const blogPost = require('../models/blog')
const blogPostControllers = require('../controllers/blog')

// Middleware to check if the user is authenticated before allowing CRUD operations
const isAuthenticated = (req, res, next) => {
    if (req.session && req.session.userId) {
      // If the session contains a user ID, allow the next middleware function to be executed
      return next();
    }
    // If the session does not contain a user ID, redirect to login
    res.status(401).json({message: 'Please login to first'})
  };

// Create a new blog post
router.post('/create', isAuthenticated, blogPostControllers.createBlog, async (req, res) => {
    try {
        const {
            title, content
        }  = req.body
        const newBlog = new blogPost({
            title, content, author: req.user.id
        });
        newBlog.user = req.user    // set the user property on the new blog post

    const result = await newBlog.save()
        res.status(201).json(result)
    } catch (error) {
        console.error('error creatingthe post', error)
        res.status(500).json({ error: 'An error occured while creating the blog'})
    }
   
})

// Get all blog posts
router.get('/', async (req, res) => {
    try {
      const newBlog = await blogPost.find();
      res.status(200).json(newBlog);
    } catch (error) {
      res.status(500).json({error: 'An error occured' });
    }
  });

// Get a blog post by ID
router.get('/:id', async (req, res) => {
    try {
        const newBlog = await blogPost.findById(req.params.id);
        if(!newBlog) {
        return res.status(404).json({ error: 'The post with the given id was not found'})
        }
        res.status(200).json(newBlog)
    } catch (error) {
        res.status(500).json({ error: 'An error occured'})
    }
})
// Update an existing blog post by ID
    router.patch('/:id', isAuthenticated, async (req, res) => {
        try {
            const {title, content} = req.body;
            if(!title || !content) {
                return res.status(400).json({error: 'Please provide a title and content'})
            }
            const updatePost = await blogPost.findByIdAndUpdate(req.params.id, 
                {$set: {title, content}},
                { new: true}
                );
                res.json(updatePost)
        } catch (error) {
            res.status(500).json({error: 'An error occured'})
        }
    })


    // Delete a blog post by ID
    router.delete('/:id', isAuthenticated, async (req, res) => {
        try {
            const removePost = await blogPost.deleteOne({ _id: req.params.id })
            res.json(removePost)
        } catch (error) {
            res.json({message: error})
        }
        })

module.exports = router