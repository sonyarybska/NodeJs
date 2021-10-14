const db = require('../dataBase/User');
const {authValidators: {authValidator}} = require('../validators');
const {comparing} = require('../services/password.service');
const {messagesEnum, statusEnum, ApiError: {ApiError}} = require('../errors/');

module.exports = {
    isAuthValid: (req, res, next) => {
        try {
            const {error, value} = authValidator.validate(req.body);

            if (error) {
                throw new ApiError(error.details[0].message, 400);
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

            const user = await db.findOne({email}).lean();

            if (!user) {
                throw new ApiError(messagesEnum.WRONG_LOGIN_OR_PASS, statusEnum.NO_FOUND);
            }

            await comparing(password, user.password);

            req.body = user;

            next();
        } catch (e) {
            next(e);
        }
    },

    checkingRole: (roleArr = []) => (req, res, next) => {
        try {
            if (!roleArr.includes(req.body.role)) {
                throw new ApiError(messagesEnum.ACCESS_DENIED, statusEnum.FORBIDDEN);
            }
            next();
        } catch (e) {
            next(e);
        }
    }
};
