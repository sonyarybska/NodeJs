const Joi = require('joi');

const {EMAIL_REGEX} = require('../configs/regexes');
const {userRole: {ADMIN, MANAGER, USER}} = require('../configs');

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

    role: Joi.string()
        .trim()
        .required()
        .allow(ADMIN, MANAGER, USER)
});

module.exports = {authValidator};
