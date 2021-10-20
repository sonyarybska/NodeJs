const {UserSchema} = require('../dataBase');
const {emailTemplatesEnum}=require('../constans');
const {messagesEnum, statusEnum} = require('../errors');
const {emailService,passwordService} = require('../services');

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

            await UserSchema.create({...req.body, password: hashPas});

            await emailService(req.body.email, emailTemplatesEnum.WELCOME);

            res.status(statusEnum.CREATED).json(messagesEnum.ADD_USER);
        } catch (e) {
            res.json(e.message);
        }
    },

    deleteUser: async (req, res) => {
        try {
            const {user} = req;

            await UserSchema.deleteOne({_id: user._id});

            res.sendStatus(statusEnum.NO_CONTENT);
        } catch (e) {
            res.json(e.message);
        }
    },

    updateUser: async (req, res) => {
        try {
            await UserSchema.updateOne({_id: req.params.id}, {$set: {name: req.body.name}});

            res.status(statusEnum.CREATED).json(messagesEnum.UPDATE_USER);
        } catch (e) {
            res.json(e.message);
        }
    }
};
