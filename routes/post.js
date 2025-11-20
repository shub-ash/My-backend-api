const express = require("express");
const PostModel = require("../model/posters");
const router = express.Router();

// Create a post
// router.post("/", async (req, res) => {
//   try {
//     const post = await Post.create(req.body); // requires {title, content, userId}
//     res.json(post);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });

router.post("/", async (req, res) => {
  const post = new PostModel({
    title: req.body.title,
    content: req.body.content,
    userId: req.body.userId,
  });
  try {
    const savedPost = await post.save();
    res.status(201).json(savedPost);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.get("/get", async (req, res) => {
  try {
    const posts = await PostModel.find().populate("userId", "name age");
    res.json(posts);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
