const Joi = require('joi');
const {regexes} = require('../constans');

const mailValidator = Joi.object({
    email: Joi.string()
        .trim()
        .regex(regexes.EMAIL_REGEX)
        .required(),
});

module.exports = {mailValidator};
