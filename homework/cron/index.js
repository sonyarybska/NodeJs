const cron = require('node-cron');

const removeOldTokens = require('./remove-old-tokens');

module.exports = () => {
    cron.schedule('0 0 12 2L *', async () => {
        await removeOldTokens();
    });
};
