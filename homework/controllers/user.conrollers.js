const User = require('../dataBase/User');

module.exports = {
    getUsers: async (req, res) => {
        try {
            const users = await User.find({});

            res.json(users);
        } catch (e) {
            res.json(e.message);
        }
    },

    getUser: async (req, res) => {
        try {
            const {id} = req.params;
            const user = await User.findById(id);

            res.json(user);
        } catch (e) {
            res.json(e.message);
        }
    },

    postUser: async (req, res) => {
        try {
            await User.create(req.body);

            res.end('User is added');
        } catch (e) {
            res.json(e.message);
        }
    },

    deleteUser: async (req, res) => {
        try {
            const {id} = req.params;

            await User.deleteOne({_id: id});

            res.end('User is deleted');
        } catch (e) {
            res.json(e.message);
        }
    },

    authUsers: (req, res) => {
        try {
            res.json(`Welcome ${req.body.email}`);
        } catch (e) {
            res.json(e.message);
        }
    }
};
