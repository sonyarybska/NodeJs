const Joi = require('joi');

const {regexes} = require('../constans');

const authValidator = Joi.object({
    email: Joi.string()
        .trim()
        .regex(regexes.EMAIL_REGEX)
        .required(),

    password: Joi.string()
        .min(5)
        .max(10)
        .trim()
        .required(),
});

module.exports = {authValidator};
