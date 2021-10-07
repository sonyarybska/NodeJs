const db = require('../dataBase/User');

module.exports = {
    createUserMiddleware: async (req, res, next) => {
        try {
            const user = await db.find({email: req.body.email});

            if (user.email) {
                throw new Error('Email already exist');
            }

            next();
        } catch (e) {
            res.json(e.message);
        }
    }
};
