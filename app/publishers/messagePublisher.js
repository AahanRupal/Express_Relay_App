const setupQueues = require('../queues/setupQueues');
const { QUEUE_NAME } = require('../../config/rabbitmq.config');

async function publishMessage(data) {
  const channel = await setupQueues();
  channel.sendToQueue(QUEUE_NAME, Buffer.from(JSON.stringify(data)), {
    persistent: true,
  });
  console.log('📤 Job enqueued:', data);
}

module.exports = publishMessage;