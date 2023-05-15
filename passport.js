const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy

const User = require('./models/users')

// Configuring the local authentication strategy with a callback function
passport.use(new LocalStrategy((email, password, done) => {
    // Finding the user in the database based on their email
    User.findOne({email: email}, (err, user) => { 
        if (err) {return done(err)}
        if(!user) {
            return done(null, false, {message: 'Incorrect email.'})
        }
        if(!user.comparePassword(password)) {
            return done(null, false, {message: 'Incorrect password.'})
        }
        return done(null, user)
    })
}))
// Serializing the user object to be stored in the session
passport.serializeUser((user, done)=> {
    done(null, user.id)
})

// Deserializing the user object from the session
passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => {
        if(err){
            return done(err)
        }
        done(null, user)
})
})

module.exports = passport