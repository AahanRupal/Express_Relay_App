const setupQueues = require('../queues/setupQueues');
const { QUEUE_NAME } = require('../../config/rabbitmq.config');

async function publishMessage(data) {
  const channel = await setupQueues();

  const jobData = {
    ...data,
    attemptCount: data.attemptCount || 1,
  };

  channel.sendToQueue(QUEUE_NAME, Buffer.from(JSON.stringify(jobData)), {
    persistent: true,
  });

  console.log('📤 Job enqueued:', jobData);
}

module.exports = publishMessage;
