const mongoose = require('mongoose');

const userSchema = new mongoose.Schema( {
    bookName: String, 
    authorName: String, 
    category: String,
    year: Number,
    
}, { timestamps: true });

module.exports = mongoose.model('Users', userSchema) //users



// String, Number
// Boolean, Object/json, array