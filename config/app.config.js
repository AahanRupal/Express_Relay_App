module.exports = {
  RETRY_LIMIT: parseInt(process.env.RETRY_LIMIT || '3', 10),
  RETRY_DELAY_MS: parseInt(process.env.RETRY_DELAY_MS || '5000', 10),
};
