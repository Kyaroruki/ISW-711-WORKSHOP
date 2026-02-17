const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
    name: {
        required: true,
        type: String
    },
    code: {
        required: true,
        type: Number
    },

    description: {
        required: true,
        type: String
    },
    
    professor: {
        type: Number,
        required: true
    }
})

module.exports = mongoose.model('Course', courseSchema)