const express = require('express');

const articleController = require('../Controllers/addArticleController');
const getAllArticleController = require('../Controllers/getAllarticleController');
const getSingleArticleController = require('../Controllers/getSingleArticle');
const updateUpvoteController = require('../Controllers/updateUpvote');
const updateCommentController = require('../Controllers/updateArticleComment')
const getUserController = require('../Controllers/getUserArticles')
const deleteArticleController = require('../Controllers/deleteSingleArticle')
const router= express.Router();
const authenticate = require('../middilewareAuth/Auth')
const multerConfig = require('../middilewareAuth/multterMiddleware')

router.get('/api/articles', getAllArticleController.getAllArticleController);
router.get('/api/articles/:name',authenticate,getSingleArticleController.getSingleArticle);
// authentication
// router.post('/api/articles/post', authenticate,articleController.postAllArticleController);
router.post('/api/articles/post', authenticate,multerConfig.single('image'), articleController.postAllArticleController);

router.put('/api/articles/:name/upvote',authenticate,updateUpvoteController.updateUpvote);

router.post('/api/articles/:name/comments',authenticate,updateCommentController.updateComment)

router.get('/api/user/:username', authenticate, getUserController.getUserArticlesController)

router.delete('/api/article/:articleId', authenticate,deleteArticleController.deleteSingleArticle);


module.exports= router