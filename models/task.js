const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    taskname: { type: String },
    status: {
        type: String,
        enum: ['backlog', 'todo', 'doing', 'done'],
        default: 'backlog',
    },
    priority: {
        type: String,
        enum: ['high', 'medium', 'low'],
        default: 'medium',
    },
    deadline: {
        type: Date,
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
}, { timestamps: true });

module.exports = mongoose.model('Task', taskSchema);
