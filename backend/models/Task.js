const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Title is required'],
        trim: true
    },
    completed: {
        type: Boolean,
        default: false
    },
    dueDate: {  // New field for due date
        type: Date,
        default: null
    }
}, { timestamps: true }); // Adds createdAt/updatedAt automatically

module.exports = mongoose.model('Task', TaskSchema);