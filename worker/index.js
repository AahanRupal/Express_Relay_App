const startWorker = require('../app/consumers/messageWorker');

(async () => {
  console.log('👷 Worker started...');
  await startWorker();
})();