const express = require('express');
const router = express.Router() 
const User = require('../models/users')


router.post('/register', async (req, res, next) => {
    try {
        const { name, email, password } = req.body
        // Check if fields are not empty or null
        if (!name || !email || !password) {
            return res.status(400).json({message: 'Name, email, and password are required'})
        }
        // Check if a user with the same email already exists
        const existingUser = await User.findOne({ email })
        if (existingUser) {
            return res.status(409).json({message: 'email already exists'})
        }
        // Create a new user and save it to the database
       const user = await User.create({name, email, password});
       return res.status(201).json({message: 'User created successfully', user})
       
    } catch (error) {
        //error handler
        return next(error)
    }
})

    router.post('/login', async (req, res, next) =>{
        try {
            const { email, password } = req.body
            const user = await User.findOne({email})
            if(!user){
                return res.status(401).json({message: 'Invalid email or password'})
            } 
            const isMatch = await user.comparePassword(password)
            if(!isMatch) {
                return res.status(401).json({message: 'Invalid email or password'})
            }
            req.session.userId = user.id; // set the userId property on the session object
            return res.status(200).json({message: 'Login successful'})
        } catch (error) {
           return next(error)
        }
    })
    router.get('/logout', (req, res, next) => {
        try {
        req.session.destroy();
        return res.status(200).json({message: 'Logout successful'})
        } catch (error) {
            return next(error)
        }
        
})

module.exports = router