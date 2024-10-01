const Articles = require('../Models/articleModel');


exports.getSingleArticle = async (req, res) => {
    try {
        const { name } = req.params;
        const { uid } = req.user;


        const Singlearticles = await Articles.findOne({ name });

   
        if (Singlearticles) {
            const upvoteIds = Singlearticles.upvoteIds || [];
           
            Singlearticles.canUpvote = uid && !upvoteIds.includes(uid);

            res.status(200).json({
                message: 'Successfully retrieved single article',
                Singlearticles: Singlearticles
            });
        } else {
          
            res.status(404).json({ message: 'Article not found' });
        }
    } catch (error) {
        console.error('Error retrieving article:', error);
        res.status(500).json({ message: 'Server error' });
    }
};
