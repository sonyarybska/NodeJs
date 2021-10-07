const User=require('../dataBase/User');

module.exports = {
    authUsers: async (req, res) => {
        const users = await User.find({});

        const id = users.find(value => value.userId);

        if (id) {
            await User.create({...req.body, userId: users[users.length - 1].userId + 1});
        } else {
            await User.create({...req.body, userId: 1});
        }
        res.end();
    }
};
