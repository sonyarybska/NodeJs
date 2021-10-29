const dayJs = require('dayjs');
const utc = require('dayjs/plugin/utc');
const {emailTemplatesEnum} = require('../constans');

const {OAuthSchema} = require('../dataBase');
const {emailService} = require('../services');

dayJs.extend(utc);

module.exports = async () => {
    const tenDays = dayJs.utc().subtract(1, 'minute');

    const user = await OAuthSchema.find({createdAt: {$lt: tenDays}}).populate('user_id');

    if (user.length) {

        const send = user.map(value => {
            return emailService(value.user_id.email, emailTemplatesEnum.REMIND, {userName: value.user_id.name});
        });

        Promise.allSettled(send).then(result => console.log(result));

    }
};
