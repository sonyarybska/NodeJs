const User=require('../dataBase/User');

module.exports = {
    authUsers: async (req, res) => {
        const users = await User.findOne({email:req.body.email});

        res.json(`Welcome ${users.email}`);
    }
};
