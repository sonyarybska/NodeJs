const {model, Schema} = require('mongoose');

const UserSchema = new Schema({
    name: {
        type: String,
        trim: true,
        required:true
    },

    email: {
        type: String,
        unique: true,
        trim: true,
        required:true
    },

    password: {
        type: String,
        trim: true,
        required:true

    }
});

module.exports = model('user', UserSchema);
