const jwt = require('jsonwebtoken');

const {ACCESS} = require('../constans/typeToken-enum');
const {ApiError} = require('../errors/ApiError');
const {messagesEnum, statusEnum} = require('../errors/');
const {JWT_ACCESS_SECRET, JWT_REFRESH_SECRET} = require('../configs/config');


module.exports = {
    generateToken: () => {
        const access_token = jwt.sign({}, JWT_ACCESS_SECRET, {expiresIn: '15m'});
        const refresh_token = jwt.sign({}, JWT_REFRESH_SECRET, {expiresIn: '30d'});

        return {
            access_token,
            refresh_token
        };
    },

    verifyToken(token, type = ACCESS) {
        try {
            const secretWord = type === ACCESS ? JWT_ACCESS_SECRET : JWT_REFRESH_SECRET;

            jwt.verify(token, secretWord);
        } catch (e) {
            throw new ApiError(messagesEnum.INVALID_TOKEN, statusEnum.UNAUTHORIZED);
        }
    }
};
