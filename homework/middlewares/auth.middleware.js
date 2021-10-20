const {UserSchema, OAuthSchema} = require('../dataBase');
const {authValidators: {authValidator}} = require('../validators');
const {passwordService: {comparing}} = require('../services');
const {messagesEnum, statusEnum, ApiError: {ApiError}} = require('../errors');
const {authService} = require('../services');
const {headerEnum:{AUTHORIZATION}} = require('../constans');

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

            const user = await UserSchema.findOne({email}).lean();

            if (!user) {
                throw new ApiError(messagesEnum.WRONG_LOGIN_OR_PASS, statusEnum.BAD_REQUEST);
            }

            await comparing(password, user.password);

            req.user = user;

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
    },

    checkAccessToken: async (req, res, next) => {
        try {
            const token = req.get(AUTHORIZATION);

            if (!token) {
                throw new ApiError(messagesEnum.ACCESS_DENIED, statusEnum.FORBIDDEN);
            }

            authService.verifyToken(token);

            const tokenResponse = await OAuthSchema.findOne({access_token: token}).populate('user_id');

            if (!tokenResponse) {
                throw new ApiError(messagesEnum.INVALID_TOKEN, statusEnum.UNAUTHORIZED);
            }

            req.user = tokenResponse.user_id;

            next();
        } catch (e) {
            next(e);
        }
    },

    checkRefreshToken: async (req, res, next) => {
        try {
            const token = req.get(AUTHORIZATION);

            if (!token) {
                throw new ApiError(messagesEnum.INVALID_TOKEN, statusEnum.UNAUTHORIZED);
            }

            authService.verifyToken(token, 'refresh');

            const tokenResponse = await OAuthSchema.findOne({refresh_token: token}).populate('user_id');

            if (!tokenResponse) {
                throw new ApiError(messagesEnum.INVALID_TOKEN, statusEnum.UNAUTHORIZED);
            }

            await OAuthSchema.deleteOne({refresh_token: token});

            req.user = tokenResponse.user_id;

            next();
        } catch (e) {
            next(e);
        }
    }
};

