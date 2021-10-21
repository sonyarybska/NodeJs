const {UserSchema, OAuthSchema, ActionSchema} = require('../dataBase');
const {emailTemplatesEnum, actionTokenEnum: {FORGOT_PASSWORD}} = require('../constans/');
const {statusEnum, messagesEnum} = require('../errors');
const {authService, emailService, passwordService} = require('../services');
const {userNormalizator} = require('../helpers/user.helper');

module.exports = {
    login: async (req, res) => {
        try {
            const {user} = req;

            const tokenPair = authService.generateToken();

            const newUser = userNormalizator(user);

            await OAuthSchema.create({...tokenPair, user_id: newUser._id});

            res.json({user: newUser, ...tokenPair}).status(statusEnum.CREATED);
        } catch (e) {
            res.json(e.message);
        }
    },

    logout: async (req, res) => {
        try {
            const {user} = req;

            await OAuthSchema.deleteOne({user_id: user._id});

            res.end();
        } catch (e) {
            res.json(e.message);
        }
    },

    refresh: async (req, res) => {
        try {
            const {user} = req;

            const tokenRefreshPair = authService.generateToken();

            const newUser = userNormalizator(user);

            await OAuthSchema.findOneAndUpdate({user_id: newUser._id}, {$set: {...tokenRefreshPair}});

            res.json({user: newUser, ...tokenRefreshPair}).status(statusEnum.CREATED);
        } catch (e) {
            res.json(e.message);
        }
    },

    forgotPassword: async (req, res) => {
        try {
            const {body: user} = req;

            const actionToken = authService.createActionToken();

            const newUser = userNormalizator(user);

            await ActionSchema.create({
                action_token: actionToken,
                type: FORGOT_PASSWORD,
                user_id: newUser._id
            });

            await emailService(user.email, emailTemplatesEnum.FORGOT_PASSWORD, {
                userName: newUser.name,
                actionToken
            });

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
    },

    activate: async (req, res) => {
        try {
            const {_id} = req.user;

            await UserSchema.updateOne({_id}, {is_active: true});

            res.status(200).json('User is active');
        } catch (e) {
            res.json(e.message);
        }

    }
};

