module.exports = {
    NODE_ENV:process.env.NODE_ENV || 'prod',

    ADMIN_PASSWORD:'sofa123%',

    MONGO_URL: process.env.MONGO_URL || 'mongodb://localhost:27017/lesson3',
    PORT: process.env.PORT || '5000',

    JWT_ACCESS_SECRET: process.env.JWT_ACCESS_SECRET || 'secret_word',
    JWT_REFRESH_SECRET: process.env.JWT_REFRESH_SECRET || 'secret_word_refresh',
    JWT_ACTION_SECRET: process.env.JWT_ACTION_SECRET || 'secret_word_action',

    NO_REPLY_EMAIL: process.env.NO_REPLY_EMAIL || 'sofaribska@gmail.com',
    NO_REPLY_PASSWORD: process.env.NO_REPLY_PASSWORD || 'ingqqchaidyamtmo',

    ALLOWED_ORIGIN: 'http://localhost:3000;http//localhost:4200' || 'http://localhost:3000'
};
