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
        type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Task' }],
        default: []
    },

}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);