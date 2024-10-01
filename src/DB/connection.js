const mongoose = require('mongoose');
const connection_string = process.env.DB_CONNECTION_STRING

mongoose.connect(connection_string).then((res)=>{
    console.log('MongoDb Connected to blog_Server sucessfully')
}).catch((err)=>{
    console.log('Error connecting to mongodb',err)
   
});