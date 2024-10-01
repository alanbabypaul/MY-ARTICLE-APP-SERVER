const Article = require('../Models/articleModel');

exports.updateComment = async (req, res) => {
    try {
        const { name } = req.params;
        const { text } = req.body;
        const {email} = req.user;


        if ( !text) {
            return res.status(400).json({ message: "Missing 'postedby' or 'text' field" });
        }

    
        const result = await Article.updateOne(
            { name },
            { $push: { comments: { postedby:email, text } } }
        );

        if (result.nModified === 0) {
            return res.status(404).json({ message: "Article not found or comment not added" });
        }

        const updatedArticle = await Article.findOne({ name });

        if (updatedArticle) {
            return res.status(200).json({ message: "Comment added successfully", updatedArticle });
        } else {
            return res.status(404).json({ message: "Article not found" });
        }
    } catch (error) {
        console.error(error); 
        return res.status(500).json({ message: "An error occurred while updating the comment" });
    }
};
