const {authService} = require('../services');
const {ActionSchema} = require('../dataBase');
const {typeTokenEnum, headerEnum} = require('../constans');
const {passwordValidator: {passwordValidator}} = require('../validators');
const {statusEnum, messagesEnum, ApiError: {ApiError}} = require('../errors');


module.exports = {
    isPasswordValid: (req, res, next) => {
        try {
            const {error, value} = passwordValidator.validate(req.body);

            if (error) {
                throw new ApiError(error.details[0].message, 400);
            }

            req.body = value;

            next();
        } catch (e) {
            next(e);
        }
    },

    checkActionToken: async (req, res, next) => {
        try {
            const token = req.get(headerEnum.AUTHORIZATION);

            if (!token) {
                throw new ApiError(messagesEnum.ACCESS_DENIED, statusEnum.FORBIDDEN);
            }

            authService.verifyToken(token, typeTokenEnum.ACTION);

            const tokenResponse = await ActionSchema.findOne({action_token: token}).populate('user_id');

            if (!tokenResponse) {
                throw new ApiError(messagesEnum.INVALID_TOKEN, statusEnum.UNAUTHORIZED);
            }

            req.user = tokenResponse.user_id;

            next();
        } catch (e) {
            next(e);
        }
    }
};

