const Article = require('../Models/articleModel');


exports.deleteSingleArticle = async (req, res) => {
    const { articleId } = req.params;
console.log("articleId in the params", articleId);
    if (!articleId) {
        return res.status(400).json({ message: 'Article ID is required' });
    }

    try {
       
        const result = await Article.findByIdAndDelete(articleId);

      
        if (!result) {
            return res.status(404).json({ message: 'Article not found' });
        }

        res.status(200).json({
            message: 'Article successfully deleted',
            deletedArticle: result
        });
    } catch (error) {
        console.error('Error deleting article:', error);
        res.status(500).json({ message: 'Server error' });
    }
};
