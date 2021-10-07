const db = require('../dataBase/User');

module.exports = {
    createUserMiddleware: async (req, res, next) => {
        const user = await db.findOne({email: req.body.email});
        try {

            if (!user) {
                throw new Error('The password or email is incorrect');
            }

            next();
        } catch (e) {
            res.json(e.message);
        }
    }
};
