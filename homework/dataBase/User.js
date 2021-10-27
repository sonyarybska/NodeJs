const {model, Schema} = require('mongoose');

const {userRole: {ADMIN, MANAGER, USER}, modelNameEnum} = require('../constans');

const UserSchema = new Schema({
    name: {
        type: String,
        trim: true,
        required: true
    },

    email: {
        type: String,
        unique: true,
        trim: true,
        required: true
    },

    password: {
        type: String,
        trim: true,
        required: true
    },

    age: {
        type: Number,
    },

    role: {
        type: String,
        trim: true,
        required: true,
        default: 'user',
        enum: [
            ADMIN,
            MANAGER,
            USER
        ]
    },

    is_active: {
        type: Boolean,
        default: false,
        required: true
    }
}, {
    timestamps: true
});

module.exports = model(modelNameEnum.USER, UserSchema);
