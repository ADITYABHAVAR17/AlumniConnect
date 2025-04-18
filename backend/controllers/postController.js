import Post from "../models/Post.js";

// Create new post
export const createPost = async (req, res) => {
  console.log(req.body);
  console.log(req.user._id);
  console.log(req.user);
  try {
    const { title, body, tags } = req.body;
    const newPost = await Post.create({
      author: req.user.id,
      title,
      body,
      tags,
    });
    console.log(newPost);
    res.status(201).json(newPost);
  } catch (error) {
    // console.error(error);
    res.status(500).json({ message: "Error creating post", error });
  }
};

// Get all posts (optional tag filter)
export const getPosts = async (req, res) => {
  try {
    const { tag } = req.query;
    const filter = tag ? { tags: tag } : {};
    const posts = await Post.find(filter)
      .populate("author", "name")
      .sort({ createdAt: -1 });
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ message: "Error fetching posts", error });
  }
};

// Get single post
export const getPostById = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id).populate("author", "name");
    res.status(200).json(post);
  } catch (error) {
    res.status(500).json({ message: "Error fetching post", error });
  }
};
