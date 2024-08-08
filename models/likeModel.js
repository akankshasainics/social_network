const {model, Schema} = require('mongoose');

const LikeSchema = new Schema({
  post_id: {
    type: Schema.Types.ObjectId,
    ref: 'Posts',
    required: true
  },
  user_id: {
    type: Schema.Types.ObjectId,
    ref: 'Users',
    required: true
  }, 
}, {
timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
}
});

module.exports = model('Like', LikeSchema);
