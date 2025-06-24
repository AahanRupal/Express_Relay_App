const setupQueues = require('../queues/setupQueues');
const { QUEUE_NAME } = require('../../config/rabbitmq.config');
const handleMessage = require('../services/messageService');
const prisma = require('../../lib/prismaClient');
const publishMessage = require('../publishers/messagePublisher');//requeue

const MAX_RETRIES = 3;



async function saveFailedJob(job, errorMessage) {
  try {
    await prisma.failedJob.create({
      data: {
        to: job.to,
        type: job.type || 'email',
        subject: job.subject || 'No Subject',
        text: job.text || '',
        error: errorMessage,
        attemptCount: job.attemptCount || 1,
      },
    });
    console.log('Failed job saved to database.');
  } catch (err) {
    console.error(' Error saving failed job to DB:', err);
  }
}

async function startWorker() {
  const channel = await setupQueues();

  channel.consume(QUEUE_NAME, async (msg) => {
    if (msg !== null) {
      const jobData = JSON.parse(msg.content.toString());
      jobData.attemptCount = jobData.attemptCount || 1; // ensure count exists

      try {
        await handleMessage(jobData);
        channel.ack(msg);
      } catch (err) {
        console.error(` Job attempt ${jobData.attemptCount} failed:`, err.message);

        if (jobData.attemptCount < MAX_RETRIES) {
          jobData.attemptCount += 1;

          await publishMessage(jobData);
          console.log(`🔁 Retrying job (attempt ${jobData.attemptCount})`);
        } else {
          await saveFailedJob(jobData, err.message);
          console.log('Max retries reached. Job marked as failed.');
        }

        channel.ack(msg); 
      }
    }
  });
}

module.exports = startWorker;
