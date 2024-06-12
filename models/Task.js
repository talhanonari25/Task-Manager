const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  status: {
    type: String,
    enum: ['pending', 'completed'],
    default: 'pending',
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
});

TaskSchema.statics.updateStatus = async (taskId, upStatus)=> {
  return this.updateOne({_id:taskId}, {$set: { status: upStatus }});
};

module.exports = mongoose.model('Task', TaskSchema);
