const {userNormalizator} = require('../helpers/user.helper');
const {emailService, authService, passwordService} = require('../services');
const {UserSchema, OAuthSchema, ActionSchema} = require('../dataBase');
const {statusEnum, messagesEnum} = require('../errors');
const {emailTemplatesEnum, typeTokenEnum} = require('../constans');

module.exports = {
    forgot: async (req, res) => {
        try {
            const {body: user} = req;

            const actionToken = authService.createActionToken();

            const newUser = userNormalizator(user);

            await ActionSchema.create({
                action_token: actionToken,
                type_action_token: typeTokenEnum.ACTION,
                user_id: newUser._id
            });

            await emailService(user.email, emailTemplatesEnum.FORGOT_PASSWORD, {userName: newUser.name});

            res.json({user: newUser, actionToken}).status(statusEnum.CREATED);
        } catch (e) {
            res.json(e.message);
        }
    },

    setPassword: async (req, res) => {
        try {
            const {user, body: {password}} = req;

            const hashPas = await passwordService.hash(password);

            await UserSchema.findByIdAndUpdate({_id: user._id}, {password: hashPas});

            await OAuthSchema.deleteMany({user_id: user._id});

            res.json(messagesEnum.PASSWORD_CHANGED);
        } catch (e) {
            res.json(e.message);
        }
    }
};
