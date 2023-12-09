const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: false,
    trim: true
  },
  status: {
    type: String,
    required: true,
    enum: ['open', 'in progress', 'done'],
    default: 'open'
  }
}, {
  timestamps: true
});

const Task = mongoose.model('Task', taskSchema);

module.exports = Task;
