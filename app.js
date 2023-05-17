const express = require('express')
const app = express()
const fileUpload = require('express-fileupload')
const cookieParser = require('cookie-parser')
const session = require('express-session')
const bcrypt = require('bcrypt')
const passport = require('passport')
const flash = require('express-flash')
require('dotenv').config()
require('./passport')
const connectDB = require('./models/db')
const blogPostsRoute = require('./routes/blog')
const userRoute = require('./routes/user')


app.use(express.urlencoded({extended: true}))
app.use(express.static('public'))


app.use(session({
    secret: 'preciousblog',
    saveUninitialized: true,
    resave: false
}))
app.use(flash())
app.use(fileUpload())
app.use(cookieParser())
app.use(passport.initialize())
app.use(passport.session())
app.use('/', blogPostsRoute)
app.use('/users', userRoute)

const PORT = process.env.PORT || 4000
const start = async () => {
    try {
        await connectDB(process.env.MONGO_URI)
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`)
        })
    } catch (error) {
        console.log(error)
    }
}
start()