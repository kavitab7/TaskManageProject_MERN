const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    username: {
        type: String
    },
    email: {
        type: String
    },
    password: {
        type: String
    },
    task: {
        type: mongoose.Types.ObjectId,
        ref: 'Task'
    },

}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);