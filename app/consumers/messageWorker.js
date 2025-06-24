const setupQueues = require('../queues/setupQueues');
const { QUEUE_NAME } = require('../../config/rabbitmq.config');
const handleMessage = require('../services/messageService');

async function startWorker() {
  const channel = await setupQueues();
  channel.consume(QUEUE_NAME, async (msg) => {
    if (msg !== null) {
      const jobData = JSON.parse(msg.content.toString());
      try {
        await handleMessage(jobData);
        channel.ack(msg);
      } catch (err) {
        console.error('❌ Job failed:', err.message);
        // Optionally: use retries, dead-letter logic here
        channel.nack(msg, false, false); // don't requeue
      }
    }
  });
}

module.exports = startWorker;