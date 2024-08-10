const { Schema, model } = require("mongoose");

const PostSchema = new Schema({
  group_id: {
    type: Schema.Types.ObjectId,
    ref: 'groups',
    required: true
  },
  author_id: {
    type: Schema.Types.ObjectId,
    ref: 'users',
    required: true
  },
  title: {
    type: String,
    require: true,
  },
  content: {
    type: String,
    required: true
  },
  likes_count: {
    type: Number,
    default: 0
  },
  comments_count: {
    type: Number,
    default: 0
  },
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
}
);

module.exports = model('post', PostSchema);
