const Joi = require('joi');

const {EMAIL_REGEX} = require("../configs/regexes");

const createUserValidator = Joi.object({
    name: Joi.string()
        .alphanum()
        .min(2)
        .max(30)
        .trim()
        .required(),

    email: Joi.string()
        .trim()
        .regex(EMAIL_REGEX)
        .required(),

    password: Joi.string()
        .min(5)
        .max(10)
        .trim()
        .required()
});

const updateUserValidator = Joi.object({
    name: Joi.string()
        .alphanum()
        .min(2)
        .max(30)
        .trim()
        .required(),
});

module.exports = {createUserValidator, updateUserValidator};
