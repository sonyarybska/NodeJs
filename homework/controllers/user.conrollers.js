const db = require('../dataBase/User');
const {hash} = require('../services/password.service');
const {userNormalizator} = require('../helpers/user.helper');
const {messagesEnum, statusEnum} = require('../errors');

module.exports = {
    getUsers: async (req, res) => {
        try {
            const users = await db.find({})
                .lean()
                .select('-password');

            res.json(users);
        } catch (e) {
            res.json(e.message);
        }
    },

    getUser: async (req, res, next) => {
        try {
            const user = await db.find({_id: req.params.id});

            const newUser = userNormalizator(user);

            res.json(newUser);
        } catch (e) {
            next(e);
        }
    },

    postUser: async (req, res) => {
        try {
            const hashPas = await hash(req.body.password);

            await db.create({...req.body, password: hashPas});

            res.status(statusEnum.CREATED).json(messagesEnum.ADD_USER);
        } catch (e) {
            res.json(e.message);
        }
    },

    deleteUser: async (req, res) => {
        try {
            const {user} = req;

            await db.deleteOne({_id: user._id});

            res.sendStatus(statusEnum.NO_CONTENT);
        } catch (e) {
            res.json(e.message);
        }
    },

    updateUser: async (req, res) => {
        try {
            await db.updateOne({_id: req.params.id}, {$set: {name: req.body.name}});

            res.status(statusEnum.CREATED).json(messagesEnum.UPDATE_USER);
        } catch (e) {
            res.json(e.message);
        }
    }
};
