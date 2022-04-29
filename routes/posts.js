var express = require('express');
var router = express.Router();
const PostsControllers = require('../controllers/posts');

/* GET home page. */
// router.get('/', function (req, res, next) {
//   res.render('index', { title: 'Express' });
// });

router.get('/', PostsControllers.getPosts);
router.post('/', PostsControllers.createPosts);
router.delete('/', (req, res) => PostsControllers.deletePosts(req, res));
router.delete('/:id', (req, res) =>
  PostsControllers.deleteSinglePost(req, res)
);
router.patch('/:id', (req, res) => PostsControllers.updatePost(req, res));

module.exports = router;
