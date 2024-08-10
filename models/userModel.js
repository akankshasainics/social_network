const { Schema, model } = require('mongoose');

const userSchema = new Schema({
    email: {
        type: String,
        require: true,
        unique: true,
    },
    first_name: {
        type: String,
        require: true,
    },
    last_name: {
        type: String,
        require: true,
    },
    password_hash: {
        type: String,
        require: true
    },
    joined_groups: {
        type: [Schema.ObjectId],
        ref: 'groups'
    }
}, {
    timestamps: {
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    }
});

module.exports = model("user", userSchema)