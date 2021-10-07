const {model, Schema} = require('mongoose');

const UserSchema = new Schema({
    userId: {
        type: Number
    },

    email: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },

    password: {
        type: String,
        required: true,
        trim: true
    }
});

module.exports = model('user', UserSchema);