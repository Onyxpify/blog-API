const mongoose = require('mongoose')

const blogSchema = new mongoose.Schema({
  title: {
        type: String,
        required: [true, 'this field is required']
    },
    content: {
        type: String,
        required: [true, 'this field is required']
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    }
})

module.exports = mongoose.model('Blogs', blogSchema)