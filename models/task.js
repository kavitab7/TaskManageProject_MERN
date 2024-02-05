const mongoose = require('mongoose');

const taskSchema = new mongoose.model({
    task: { type: String },
    status: {
        type: String,
        enum: ['backlog', 'todo', 'doing', 'done'],
        default: 'backlog',
    },
    createdBy: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
    }
}, { timestamp: true });

module.exports = mongoose.model('Task', taskSchema);