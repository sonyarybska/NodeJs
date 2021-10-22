const {model, Schema} = require('mongoose');

const {modelNameEnum} = require('../constans');

const ActionSchema = new Schema({
    action_token: {
        type: String,
        trim: true,
        required: true
    },

    user_id: {
        type: Schema.Types.ObjectId,
        trim: true,
        required: true,
        ref: 'user'
    },

    type: {
        type: String,
        trim: true,
        required: true
    }
});

module.exports = model(modelNameEnum.ACTION, ActionSchema);
