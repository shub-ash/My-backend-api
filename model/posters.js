const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Post title is required"],
  },
  content: {
    type: String,
  },
  // 1-to-Many (User → Posts)
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Data", // references User model
    required: true,
  },
});

module.exports = mongoose.model("Post", postSchema);
