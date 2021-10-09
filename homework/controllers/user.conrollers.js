const db = require('../dataBase/User');
const {hash} = require('../services/password.service');
const {userNormalizator} = require('../helpers/user.helper');

module.exports = {
    getUsers: async (req, res) => {
        try {
            const users = await db.find({}).lean();

            const newUsers = users.map(value => userNormalizator(value));

            res.json(newUsers);
        } catch (e) {
            res.json(e.message);
        }
    },

    getUser: async (req, res) => {
        try {
            const {id} = req.params;
            const user = await db.findById(id).lean();

            const newUser = userNormalizator(user);

            res.json(newUser);
        } catch (e) {
            res.json(e.message);
        }
    },

    postUser: async (req, res) => {
        try {
            const hashPas = await hash(req.body.password);

            await db.create({...req.body, password: hashPas});

            res.end('User is added');
        } catch (e) {
            res.json(e.message);
        }
    },

    deleteUser: async (req, res) => {
        try {
            const {id} = req.params;

            await db.deleteOne({_id: id});

            res.end('User is deleted');
        } catch (e) {
            res.json(e.message);
        }
    },

    updateUser: async (req, res) => {
        try {
            await db.updateOne({_id: req.params.id}, {$set: {name: req.body.name}});

            res.end('User updated');
        } catch (e) {
            res.json(e.message);
        }
    }
};
