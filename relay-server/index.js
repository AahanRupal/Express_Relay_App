const express = require('express');
const bodyParser = require('body-parser');
const publishMessage = require('../app/publishers/messagePublisher');

const app = express();
app.use(bodyParser.json());

app.post('/send-message', async (req, res) => {
  try {
    await publishMessage(req.body);
    res.status(202).json({ status: 'queued', data: req.body });
  } catch (error) {
    console.error('Error publishing message:', error);
    res.status(500).json({ error: 'Failed to queue message' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 Relay server running on port ${PORT}`));