const {model, Schema} = require('mongoose');

const {modelNameEnum} = require('../constans');

const oAuthSchema = new Schema({
    access_token: {
        type: String,
        trim: true,
        required: true
    },

    refresh_token: {
        type: String,
        trim: true,
        required: true
    },

    user_id: {
        type: Schema.Types.ObjectId,
        trim: true,
        required: true,
        ref: 'user'
    }
});

module.exports = model(modelNameEnum.O_AUTH, oAuthSchema);
