const amqp = require('amqplib');
const { RABBITMQ_URL } = require('../../config/rabbitmq.config');

async function createConnection() {
  const connection = await amqp.connect(RABBITMQ_URL);
  const channel = await connection.createChannel();
  return { connection, channel };
}

module.exports = createConnection;