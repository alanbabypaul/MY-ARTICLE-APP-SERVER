const Article = require('../Models/articleModel');

// POST /articles
exports.postAllArticleController = async (req, res) => {
  // console.log("Inside the postAllArticleController");
const userId = req.user.id;
// 
  
  // console.log('Request Body:', req.body);
  // console.log('Uploaded File:', req.file);

  
  const { name, title, content } = req.body;

  

  const image = req.file ? req.file.filename : null;

  try {

    const existingArticle = await Article.findOne({ content });
    if (existingArticle) {
      return res.status(400).json({ message: 'Article with this content already exists' });
    }

  
    const newArticle = new Article({
      name,
      title,
      content: [content], 
      image,
      userId
    });

    
    const savedArticle = await newArticle.save();

    res.status(200).json({
      success: true,
      message: 'Article posted successfully',
      savedArticle:savedArticle,
      uploadedImageUrl: savedArticle.image 
    });
  } catch (error) {
   
    console.error('Error posting article:', error);
    res.status(500).json({ message: 'Server error' });
  }
};
