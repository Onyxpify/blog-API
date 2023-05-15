const mongoose = require('mongoose');

const connectDB = (url) => {
    mongoose.connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 30000,
    }).then(() => {
      console.log('Connected to database');
    }).catch((error) => {
      console.log('Error connecting to database:', error);
    });
}
require('./users')
require('./blog')
module.exports = connectDB;