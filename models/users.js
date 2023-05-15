const mongoose = require('mongoose');
const bcrypt = require('bcrypt')

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'name must be field'],
    },
    email: {
        type: String,
        required: [true, 'email must be field'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'provide a password']
    },
   
})

userSchema.pre('save', async function(next) {
    try {
        if(!this.isModified('password')) {
        return next()
    } 
    const hashedPassword = await bcrypt.hash(this.password, 10)
    this.password = hashedPassword;
    return next()
    } catch (error) {
        return next(error)
    }
})
userSchema.methods.comparePassword = async function(candidatePassword, next) {
    try {
        const isMatch = await bcrypt.compareSync(candidatePassword, this.password);
        return isMatch;
    } catch (error) {
        return error;
    }
}
module.exports = mongoose.model('Users', userSchema)