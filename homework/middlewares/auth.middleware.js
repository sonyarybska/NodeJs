const db = require('../dataBase/User');
const {authValidators: {authValidator}} = require('../validators');
const {comparing} = require('../services/password.service');
const {errorMessages: {ACCESS_DENIED, WRONG_LOGIN_OR_PASS}, ApiError: {ApiError}} = require('../errors/');

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

            const user = await db.findOne({email});

            if (!user) {
                throw new ApiError(WRONG_LOGIN_OR_PASS.message, WRONG_LOGIN_OR_PASS.code);
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
                throw new ApiError(ACCESS_DENIED.message, ACCESS_DENIED.code);
            }
            next();
        } catch (e) {
            next(e);
        }
    }
};
