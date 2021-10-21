const {OAuthSchema, UserSchema, ActionSchema} = require('../dataBase');
const {emailTemplatesEnum} = require('../constans');
const {messagesEnum, statusEnum} = require('../errors');
const {emailService, passwordService, authService} = require('../services');
const {actionTokenEnum: {ACTIVATE_USER}} = require('../constans');

module.exports = {
    getUsers: async (req, res) => {
        try {
            const users = await UserSchema.find({})
                .lean()
                .select('-password');

            res.json(users);
        } catch (e) {
            res.json(e.message);
        }
    },

    getUser: async (req, res, next) => {
        try {
            const user = await UserSchema.find({_id: req.params.id}).select('-password');

            res.json(user);
        } catch (e) {
            next(e);
        }
    },

    postUser: async (req, res) => {
        try {

            const hashPas = await passwordService.hash(req.body.password);

            const user = await UserSchema.create({...req.body, password: hashPas});

            const actionToken = authService.createActionToken();

            await ActionSchema.create({action_token: actionToken, type: ACTIVATE_USER, user_id: user._id});

            await emailService(user.email, emailTemplatesEnum.WELCOME, {userName: user.name, token: actionToken});

            res.status(statusEnum.CREATED).json({user,actionToken});
        } catch (e) {
            res.json(e.message);
        }
    },

    deleteUser: async (req, res) => {
        try {
            const {user} = req;

            await UserSchema.deleteOne({_id: user._id});

            await OAuthSchema.deleteMany({user_id: user._id});

            await emailService(user.email, emailTemplatesEnum.DELETE, {userName: user.name});

            res.sendStatus(statusEnum.NO_CONTENT);
        } catch (e) {
            res.json(e.message);
        }
    },

    updateUser: async (req, res) => {
        try {
            const newUser = await UserSchema.findOneAndUpdate({_id: req.params.id}, {$set: {name: req.body.name}});

            await emailService(newUser.email, emailTemplatesEnum.UPDATE, {userName: newUser.name});

            res.status(statusEnum.CREATED).json(messagesEnum.UPDATE_USER);
        } catch (e) {
            res.json(e.message);
        }
    }
};
