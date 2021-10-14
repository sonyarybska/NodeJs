const {messagesEnum, statusEnum} = require('../errors');
const {userNormalizator} = require('../helpers/user.helper');

module.exports = {
    authUsers: (req, res) => {
        try {
            const newUser = userNormalizator(req.body);

            res.json(messagesEnum.SUCCESSFUL_AUTH(newUser.name)).status(statusEnum.CREATED);
        } catch (e) {
            res.json(e.message);
        }
    }
};
