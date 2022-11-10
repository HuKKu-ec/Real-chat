const blogSchema = require('../model/BlogsSchema');

//get all blogs

const getBlogs = async (req, res) => {
  try {
    const user_id = JSON.stringify(req.user._id);
    const blogs = await blogSchema.find({ user_id });
    res.status(200).json({ blogs });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
//delete blog
const deleteBlog = async (req, res) => {
  try {
    const blog = await blogSchema.findOne({ _id: req.params.id });
    blogSchema.deleteOne({ _id: req.params.id }).then(() => {
      res.status(200).json(blog);
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
//post blog
const postBlog = async (req, res) => {
  try {
    const { title, blog } = req.body;
    const user_id = JSON.stringify(req.user._id);

    const blogs = await blogSchema.create({ title, blog, user_id });

    if (blogs) {
      res.status(200).json({ blogs });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
//get blog one
const getBlog = async (req, res) => {
  try {
    const blog = await blogSchema.findOne({ _id: req.params.id });
    res.status(200).json({ blog });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
//post edit blogs
const EditBlog = async (req, res) => {
  try {
    const { title, blog } = req.body;
    const user_id = JSON.stringify(req.user._id);
    const blogs = await blogSchema.findOneAndUpdate(
      { _id: req.params.id },
      { title, blog, user_id: user_id }
    );
    if (blogs) {
      res.status(200).json({ status: blogs });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
module.exports = {
  getBlogs,
  deleteBlog,
  postBlog,
  getBlog,
  EditBlog,
};
