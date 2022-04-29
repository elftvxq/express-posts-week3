const handleSuccess = require('../service/handleSuccess');
const handleError = require('../service/handleError');
const Posts = require('../models/postsModel');

const posts = {
  async getPosts(req, res) {
    // sorting post by new to old
    const allPosts = await Posts.find().sort({ createdAt: -1 });

    handleSuccess(res, allPosts);
    res.end();
  },
  async createPosts(req, res) {
    const data = req.body;
    try {
      const newPost = await Posts.create({
        ...data,
      });
      handleSuccess(res, newPost);
    } catch (err) {
      handleError(res, 400, 40002, err.message);
    }
  },

  async deletePosts(req, res) {
    await Posts.deleteMany({});
    handleSuccess(res, '成功刪除所有資料');
  },

  async deleteSinglePost(req, res) {
    try {
      const postID = req.params.id;
      const result = await Posts.findByIdAndDelete(postID);

      if (result) {
        handleSuccess(res, '成功刪除資料');
      } else {
        handleError(res, 400, 40003);
      }
    } catch {
      handleError(res, 400, 40001);
    }
  },

  async updatePost(req, res) {
    const postID = req.params.id;
    const updateData = req.body;

    try {
      const result = await Posts.findByIdAndUpdate(postID, updateData);
      if (!result) {
        handleError(res, 400, 40003);
      } else {
        handleSuccess(res, '成功更新資料');
      }
    } catch (error) {
      handleError(res, 400, 40002, error.message);
    }
  },
};

module.exports = posts;
