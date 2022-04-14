const express = require('express');
const blogController = require('../controllers/blogController');


const router = express.Router();

router.get('/', blogController.blog_index);

router.post('/', blogController.create_blog);

router.delete('/:id', blogController.delete_blog);

router.get('/:id', blogController.blog_details);

module.exports = router;