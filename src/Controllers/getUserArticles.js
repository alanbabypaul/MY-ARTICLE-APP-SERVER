const Article = require('../Models/articleModel');

exports.getUserArticlesController = async (req, res) => {
  
    const { username } = req.params;
    if (!username) {
        return res.status(400).json({ message: 'User ID is required' });
    }

    try {
       
        const articles = await Article.find({ name: username}).exec();

        if (articles.length === 0) {
            return res.status(404).json({ message: 'No articles found for this user' });
        }

        res.status(200).json({
            message: 'Successfully retrieved user articles',
            articles: articles
        });
    } catch (error) {
        console.error('Error retrieving articles:', error);
        res.status(500).json({ message: 'Server error' });
    }
};
