module.exports = {
    MONGO_URL: process.env.MONGO_URL || 'mongodb://localhost:27017/lesson3',
    PORT: process.env.PORT || '5000',
    JWT_ACCESS_SECRET: process.env.JWT_ACCESS_SECRET || 'secret_word',
    JWT_REFRESH_SECRET: process.env.JWT_REFRESH_SECRET || 'secret_word_refresh'
};
