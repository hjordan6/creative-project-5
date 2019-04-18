const mongoose = require('mongoose');
const express = require("express");
const router = express.Router();
const auth = require("./auth.js");

// Configure multer so that it will upload to '/public/images'
const multer = require('multer');

const upload = multer({
  dest: '../public/images/',
  limits: {
    fileSize: 10000000
  }
});

const users = require("./users.js");
const User = users.model;

const postSchema = new mongoose.Schema({
    user: {
      type: mongoose.Schema.ObjectId,
      ref: 'User'
    },
    title: String,
    post: String,
    created: {
      type: Date,
      default: Date.now
    },
  });

  const Post = mongoose.model('Post', postSchema);

  // make a psot
  router.post("/", auth.verifyToken, User.verify, upload.single("post"), async (req, res) => {
      console.log(req.user);
      console.log(req.body.title);
      console.log(req.body.post);
      const post = new Post({
      user: req.user,
      title: req.body.title,
      post: req.body.post,
    });
    try {
      await post.save();
      return res.sendStatus(200);
    } catch (error) {
      console.log(error);
      return res.sendStatus(500);
    }
  });

  // get my photos
  router.get("/", auth.verifyToken, User.verify, async (req, res) => {
    // return photos
    console.log("Get Request Recieved");
    try {
      let posts = await Post.find({
        user: req.user
      }).sort({
        created: -1
      });
      return res.send(posts);
    } catch (error) {
      console.log(error);
      return res.sendStatus(500);
    }
  });

// get all photos
router.get("/all", async (req, res) => {
  console.log("Get All Request Recieved");
  try {
    let posts = await Post.find().sort({
      created: -1
    }).populate('user');
    return res.send(posts);
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
});

router.delete("/delete/:title", async (req, res) => {
  console.log("Delete");
  console.log(req.body);
  console.log(req.params.title);
  try {
    await Post.deleteOne({
      title: req.params.title,
    });
    res.sendStatus(200);
  } catch(error) {
    console.log(error);
    res.sendStatus(500);
  }
});

  module.exports = {
    model: Post,
    routes: router,
  }