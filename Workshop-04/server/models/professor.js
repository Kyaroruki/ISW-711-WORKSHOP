const mongoose = require("mongoose")

const professorSchema = new mongoose.Schema({
    name: {
        required: true,
        type: String
    },
    lastname: {
        required: true,
        type: String
    },
    id: {
        required: true,
        type: Number,
        unique: true
    },
    age: {
        required: true,
        type: Number
    }
})

module.exports = mongoose.model('Professor', professorSchema)