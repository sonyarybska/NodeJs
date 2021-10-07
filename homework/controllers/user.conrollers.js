const User = require('../dataBase/User');

module.exports = {
    getUsers: async (req, res) => {
        const users = await User.find({});

        res.json(users);
    },

    getUser: async (req, res) => {
        const user = await User.findOne({userId: +req.params.id});

        return res.json(user);
    },

    postUser: async (req, res) => {
        const users = await User.find({});

        const id = users.find(value => value.userId);

        if (id) {
            await User.create({...req.body, userId: users[users.length - 1].userId + 1});
        } else {
            await User.create({...req.body, userId: 1});
        }

        res.end();
    },

    deleteUser: async (req, res) => {
        await User.deleteOne({userId: +req.params.id});
        
        res.end();
    },
    authUsers: async (req, res) => {
        const users = await User.findOne({email:req.body.email});

        res.json(`Welcome ${users.email}`);
    }
};
