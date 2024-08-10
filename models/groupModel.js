const { Schema, model } = require("mongoose");

const groupSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    },
    description: {
        type: String,
        required: true,
    },
    created_by: {
        type: Schema.ObjectId,
        required: true,
        ref: 'users'
    },
    members: {
        type: [
            {
                member_id: {
                    type: Schema.ObjectId,
                    required: true,
                    ref: 'users'
                },
                joining_date: {
                    type: Date,
                    default: Date.now,
                }

            }
        ]
    }

}, {
    timestamps: {
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    }
})

module.exports = model('group', groupSchema);