const {userRole:{ADMIN}} = require('../constans');
const {UserSchema} = require('../dataBase');
const {userRole} = require('../constans');
const {passwordService: {hash}} = require('../services');
const {ADMIN_PASSWORD}=require('../configs/config');

module.exports = async () => {
    const user = await UserSchema.findOne({role: userRole.ADMIN});

    if (!user) {
        const hashPas = await hash(ADMIN_PASSWORD);

        await UserSchema.create({
            name: 'Sonya',
            email: 'sofaribskagmail.com',
            password: hashPas,
            role:ADMIN
        });
    }
};

