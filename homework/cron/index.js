const cron = require('node-cron');

const removeOldTokens = require('./remove-old-tokens');
const remind = require('./send-mail-old-users');

module.exports = () => {
    cron.schedule('0 0 12 2L *', async () => {
        await removeOldTokens();
    });
    cron.schedule('*/1 * * * *', async () => {
        await remind();
    });
};
