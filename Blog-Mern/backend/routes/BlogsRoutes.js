var express = require('express');
const router = express.Router();

const {
  getBlogs,
  deleteBlog,
  postBlog,
  getBlog,
  EditBlog,
} = require('../controller/BlogsController');
const requireAuth = require('../middleware/Autherization');

router.use(express.json());
router.use(requireAuth);
//get request
router.get('/', getBlogs);
//delete request
router.delete('/:id', deleteBlog);
//post request
router.post('/', postBlog);

router.get('/:id', getBlog);

router.post('/edit/:id', EditBlog);

module.exports = router;
