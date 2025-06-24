const createConnection = require('./connection');
const { QUEUE_NAME } = require('../../config/rabbitmq.config');

async function setupQueues() {
  const { channel } = await createConnection();
  await channel.assertQueue(QUEUE_NAME, { durable: true });
  return channel;
}

module.exports = setupQueues;