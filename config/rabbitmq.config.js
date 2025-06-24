module.exports = {
  RABBITMQ_URL: process.env.RABBITMQ_URL || 'amqp://localhost',
  QUEUE_NAME: 'messageQueue',
};