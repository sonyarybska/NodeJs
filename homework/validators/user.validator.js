const Joi = require('joi');

const {regexes, userRole: {ADMIN, MANAGER, USER}} = require('../configs');

const createUserValidator = Joi.object({
    name: Joi.string()
        .alphanum()
        .min(2)
        .max(30)
        .trim()
        .required(),

    email: Joi.string()
        .trim()
        .regex(regexes.EMAIL_REGEX)
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

const updateUserValidator = Joi.object({
    name: Joi.string()
        .alphanum()
        .min(2)
        .max(30)
        .trim()
        .required()
});

module.exports = {createUserValidator, updateUserValidator};
