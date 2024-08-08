import { Schema, model }  from "mongoose";

const userSchema = new Schema({
    emai: {
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
    }
}, {
timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
}
});

module.exports = model("User", userSchema)