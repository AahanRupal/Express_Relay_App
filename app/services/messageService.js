const sgMail = require('@sendgrid/mail');
require('dotenv').config();

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

module.exports = async function handleMessage(job) {
  if (job.forceFail) {
    throw new Error('Forced failure for testing');
  }

  if (job.type === 'email') {
    const msg = {
      to: job.to,
      from: process.env.FROM_EMAIL, // Must be verified in SendGrid
      subject: job.subject,
      text: job.text,
    };

    await sgMail.send(msg);
    console.log('✅ Email sent to', job.to);
  } else {
    console.log('⚠️ Unsupported message type:', job.type);
  }
};
