const {Types} = require('mongoose');

const db = require('../dataBase/User');
const {userValidators: {createUserValidator, updateUserValidator}} = require('../validators');
const {ApiError: {ApiError}, errorMessages: {USER_EXIST, NOT_FOUND_USER, USER_ID_VALID}} = require('../errors');


module.exports = {
    createUserMiddleware: async (req, res, next) => {
        try {
            const {email} = req.body;
            const user = await db.findOne({email});

            if (user) {
                throw new ApiError(USER_EXIST.message, USER_EXIST.code);

            }
            next();
        } catch (e) {
            next(e);
        }
    },

    isUserValid: (req, res, next) => {
        try {
            const {error, value} = createUserValidator.validate(req.body);

            if (error) {
                throw new ApiError(error.details[0].message, 400);
            }

            req.body = value;
            next();
        } catch (e) {
            next(e);
        }
    },

    isUpdateValid: (req, res, next) => {
        try {
            const {error, value} = updateUserValidator.validate(req.body);

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
            const user = await db.exists({_id: Types.ObjectId(id)});

            if (!user) {
                throw new ApiError(NOT_FOUND_USER.message, NOT_FOUND_USER.code);
            }
            next();
        } catch (e) {
            next(e);
        }
    },

    isUserIdValid: (req, res, next) => {
        try {
            if (!Types.ObjectId.isValid(req.params.id)) {
                throw new ApiError(USER_ID_VALID.message, USER_ID_VALID.code);
            }
            next();
        } catch (e) {
            next(e);
        }
    },
};
