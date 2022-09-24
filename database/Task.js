const mongoose = require('mongoose')

const dataSchema = new mongoose.Schema({
    title : {
        required: true,
        type: String
    },
    author: {
        required: true,
        type: String
    },
    subTasks: [{
        required: true,
        type: String
    }],
    places: [{
        required: true,
        type: String
    }]
})

module.exports = mongoose.model('Task', dataSchema)