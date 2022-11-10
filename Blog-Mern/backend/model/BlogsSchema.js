const mongoose = require('mongoose');
const { Schema } = mongoose;
const BlogSchema = new Schema({
  title: { type: String, required: true },
  blog: { type: String, required: true },
  user_id: { type: String, required: true },
});
module.exports = mongoose.model('Blog', BlogSchema);
