import { Schema, model }  from "mongoose";

const groupSchema = new Schema({
    name: {
        type: String,
        require: true,
        unique: true,
    },
    description: {
        type: String,
        require: true,
    },
    members: {
        type: [
            {
                user_id: {
                    type: Schema.ObjectId, 
                    require: true,
                    ref: 'Users'
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
} )

module.exports = model('Group', groupSchema);