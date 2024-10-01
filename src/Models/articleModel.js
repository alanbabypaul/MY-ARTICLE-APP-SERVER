const mongoose = require('mongoose');

const articleSchema = new mongoose.Schema({
    name: {
        type: String,
        
    },
    title: {
        type: String,
    },
    content: [
        {
            type: String
        }
    ],
    upvotes: {
        type: Number,
        default: 0,
    },
    comments: [{
        postedby: {
            type: String,
            
        },
        text: {
            type: String,
            
        },
    }],
    image: {
        type: String,
       
    }
    
});

const Articles = mongoose.model('Articles', articleSchema);

module.exports = Articles;
