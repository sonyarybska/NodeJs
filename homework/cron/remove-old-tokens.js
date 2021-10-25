const dayJs=require('dayjs');
const utc=require('dayjs/plugin/utc');

dayJs.extend(utc);

const {OAuthSchema} = require('../dataBase');

module.exports=async ()=>{
    const previousMonth=dayJs.utc().subtract(1,'month');

    await OAuthSchema.deleteMany({
        createdAt:{$lt:previousMonth}
    });
};
