const Article = require('../Models/articleModel');

exports.updateUpvote = async (req, res) => {
  
  try {
    const { name } = req.params;
    const { uid } = req.user;
    console.log(uid)


    const article = await Article.findOne({ name });

    if (article) {
      
      const upvoteIds = article.upvoteIds || [];
      
      const canUpvote = uid && !upvoteIds.includes(uid);

      if (canUpvote) {

        const updatedArticle = await Article.findOneAndUpdate(
          { name },
          {
            $inc: { upvotes: 1 },
            $push: { upvoteIds: uid }
          },
          { new: true, useFindAndModify: false }
        );

  
        return res.status(200).json({
          message: 'Upvote updated successfully',
          updatedArticle
        });
      } else {
   
        return res.status(400).json({
          message: 'User has already upvoted'
        });
      }
    } else {
   
      return res.status(404).json({
        message: 'Article not found'
      });
    }
  } catch (error) {
 
    return res.status(500).json({
      error: error.message
    });
  }
};
