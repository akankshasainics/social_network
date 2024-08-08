const {model, Schema}  = require("mongoose");

const CommentSchema = new Schema({
  post_id: {
    type: Schema.Types.ObjectId,
    ref: 'Posts',
    required: true
  },
  author_id: {
    type: Schema.Types.ObjectId,
    ref: 'Users',
    required: true
  },
  text: {
    type: String,
    required: true
  }, 
}, {
timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
}
});

module.exports = model('Comment', CommentSchema);
