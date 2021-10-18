const {authService: {generateToken}} = require('../services');
const {statusEnum} = require('../errors');
const {userNormalizator} = require('../helpers/user.helper');
const {OAuthSchema} = require('../dataBase');

module.exports = {
    login: async (req, res) => {
        try {
            const {user} = req;

            const tokenPair = generateToken();

            const newUser = userNormalizator(user);

            await OAuthSchema.create({...tokenPair, user_id: newUser._id});

            res.json({user: newUser, ...tokenPair}).status(statusEnum.CREATED);
        } catch (e) {
            res.json(e.message);
        }
    },

    logout: async (req, res) => {
        try {
            const {user} = req;

            await OAuthSchema.deleteOne({user_id: user._id});

            res.end();
        } catch (e) {
            res.json(e.message);
        }
    },

    refresh: async (req, res) => {
        try {
            const {user,token} = req;

            await OAuthSchema.deleteOne({refresh_token: token});

            const tokenRefreshPair = generateToken();

            const newUser = userNormalizator(user);

            await OAuthSchema.create({...tokenRefreshPair, user_id: newUser._id});

            res.json({user: newUser, ...tokenRefreshPair}).status(statusEnum.CREATED);
        } catch (e) {
            res.json(e.message);
        }
    }
};
