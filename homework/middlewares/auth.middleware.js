const db = require('../dataBase/User');
const {comparing} = require("../services/password.service");

module.exports = {
    checkLogin: async (req, res, next) => {
        try {
            const {email, password} = req.body;

            const user = await db.findOne({email});

            if (!user) {
                throw new Error('Wrong email or password');
            }

            await comparing(password, user.password);

            next();
        } catch (e) {
            res.json(e.message);
        }
    },
};
