const Article = require('../Models/articleModel');

exports.getAllArticleController = async (req, res) => {
    try {
       
        const articles = await Article.find();

      
        res.status(200).json({
            message: 'Successfully retrieved all articles',
            articles: articles
        });
    } catch (error) {
        console.error('Error retrieving articles:', error);
        res.status(500).json({ message: 'Server error' });
    }
};
