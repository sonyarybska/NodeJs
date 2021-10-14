const Joi = require('joi');

const {userRole: {ADMIN, MANAGER, USER}, regexes: {EMAIL_REGEX}} = require('../constans');

const authValidator = Joi.object({
    email: Joi.string()
        .trim()
        .regex(EMAIL_REGEX)
        .required(),

    password: Joi.string()
        .min(5)
        .max(10)
        .trim()
        .required(),
});

module.exports = {authValidator};
