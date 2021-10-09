const bcrypt = require('bcrypt');

module.exports = {
    hash: (password) => bcrypt.hash(password, 10),

    comparing: async (password, hashPassword) => {
        const matchedPassword = await bcrypt.compare(password, hashPassword);

        if (!matchedPassword) {
            throw new Error('Wrong email or password');
        }
    }
};
