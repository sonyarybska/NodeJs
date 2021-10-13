const bcrypt = require('bcrypt');

const {ApiError} = require('../errors/ApiError');

module.exports = {
    hash: (password) => bcrypt.hash(password, 10),

    comparing: async (password, hashPassword) => {
        const matchedPassword = await bcrypt.compare(password, hashPassword);

        if (!matchedPassword) {
            throw new ApiError('Wrong email or password',400);
        }
    }
};
