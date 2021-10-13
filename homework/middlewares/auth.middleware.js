const db = require('../dataBase/User');
const {ApiError} = require('../errors/ApiError');
const {authValidators: {authValidator}} = require('../validators');
const {comparing} = require('../services/password.service');

module.exports = {
    isAuthValid: (req, res, next) => {
        try {
            const {error, value} = authValidator.validate(req.body);

            if (error) {
                throw new ApiError(error.details[0].message, 500, 400);
            }

            req.body = value;

            next();
        } catch (e) {
            next(e);
        }
    },

    checkLogin: async (req, res, next) => {
        try {
            const {email, password} = req.body;

            const user = await db.findOne({email});

            if (!user) {
                throw new ApiError('Wrong email or password', 404);
            }

            await comparing(password, user.password);

            next();
        } catch (e) {
            next(e);
        }
    },

    checkingRole: (roleArr = []) => (req, res, next) => {
        try {
            if (!roleArr.includes(req.body.role)) {
                throw new ApiError('Access denied');
            }

            next();
        } catch (e) {
            next(e);
        }
    }
};
