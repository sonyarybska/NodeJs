const db = require('../dataBase/User');
const {authValidator} = require("../validators/auth.validator");
const {comparing} = require("../services/password.service");

module.exports = {
    isAuthValid: (req, res, next) => {
        try {
            const {error, value} = authValidator.validate(req.body);

            if (error) {
                throw new Error(error.details[0].message);
            }

            req.body = value;

            next();
        } catch (e) {
            res.json(e.message);
        }
    },

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
