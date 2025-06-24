const sgMail = require('@sendgrid/mail');
require('dotenv').config();

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

async function handleMessage(data) {
  if (data.type === 'email') {
    const msg = {
      to: data.to,
      from: process.env.FROM_EMAIL, // must be verified in SendGrid
      subject: data.subject,
      text: data.text,
    };

    await sgMail.send(msg);
    console.log('✅ Email sent to', data.to);
  } else {
    console.log('⚠️ Unsupported message type:', data.type);
  }
}
module.exports = handleMessage;
