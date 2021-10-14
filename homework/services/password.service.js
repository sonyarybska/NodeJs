const bcrypt = require('bcrypt');

const {errorMessages: {WRONG_LOGIN_OR_PASS},ApiError:{ApiError}} = require('../errors');

module.exports = {
    hash: (password) => bcrypt.hash(password, 10),

    comparing: async (password, hashPassword) => {
        const matchedPassword = await bcrypt.compare(password, hashPassword);

        if (!matchedPassword) {
            throw new ApiError(WRONG_LOGIN_OR_PASS.message, WRONG_LOGIN_OR_PASS.code);
        }
    }
};
