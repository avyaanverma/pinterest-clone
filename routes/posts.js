var mongoose = require('mongoose');
mongoose.connect("mongodb://127.0.0.1:27017/pinterest");

const postSchema = new mongoose.Schema({
    postText: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    likes: {
      type: Number,
      default: 0,
    },
  });


const postsModel = mongoose.model("posts", postSchema);

module.exports = postsModel;