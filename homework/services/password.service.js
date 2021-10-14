const bcrypt = require('bcrypt');

const {messagesEnum, statusEnum, ApiError: {ApiError}} = require('../errors');

module.exports = {
    hash: (password) => bcrypt.hash(password, 10),

    comparing: async (password, hashPassword) => {
        const matchedPassword = await bcrypt.compare(password, hashPassword);

        if (!matchedPassword) {
            throw new ApiError(messagesEnum.WRONG_LOGIN_OR_PASS, statusEnum.NO_FOUND);
        }
    }
};
