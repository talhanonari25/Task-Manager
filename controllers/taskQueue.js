const Bull = require('bull');
const taskQueue = new Bull('taskQueue', {
  redis: {
    host: '127.0.0.1',
    port: 6379,
  },
});

taskQueue.process(async (job) => {
  const { taskId } = job.data;
  await Task.updateStatus(taskId, 'completed');
});

module.exports = taskQueue;
