const {Types} = require('mongoose');

const {UserSchema} = require('../dataBase');
const {ApiError: {ApiError}, messagesEnum, statusEnum} = require('../errors');

module.exports = {
    createUserMiddleware: async (req, res, next) => {
        try {
            const {email} = req.body;
            const user = await UserSchema.findOne({email});

            if (user) {
                throw new ApiError(messagesEnum.USER_EXIST, statusEnum.CONFLICT);

            }
            next();
        } catch (e) {
            next(e);
        }
    },

    isBodyValid: (validator) => (req, res, next) => {
        try {
            const {error, value} = validator.validate(req.body);

            if (error) {
                throw new ApiError(error.details[0].message, 400);
            }

            req.body = value;
            next();
        } catch (e) {
            next(e);
        }
    },

    checkExistUser: async (req, res, next) => {
        try {
            const {id} = req.params;
            const user = await UserSchema.findOne({_id: Types.ObjectId(id)});

            if (!user) {
                throw new ApiError(messagesEnum.NOT_FOUND_USER, statusEnum.NO_FOUND);
            }

            req.body=user;
            next();
        } catch (e) {
            next(e);
        }
    },

    isUserIdValid: (req, res, next) => {
        try {
            if (!Types.ObjectId.isValid(req.params.id)) {
                throw new ApiError(messagesEnum.USER_ID_VALID, statusEnum.NO_FOUND);
            }
            next();
        } catch (e) {
            next(e);
        }
    },
};
