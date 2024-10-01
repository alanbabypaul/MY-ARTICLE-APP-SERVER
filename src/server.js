const fs = require('fs');
const admin = require('firebase-admin');
const path = require('path');
const multer = require('multer');
const bodyParser = require('body-parser');


// fire base backend setup
const credentials = JSON.parse(fs.readFileSync('./credential.json'))
admin.initializeApp({
    credential: admin.credential.cert(credentials),
  
 });



require('dotenv').config();
const express = require('express');
const cors = require('cors');
require('./DB/connection')
const routes = require('./Routes/router');





// server creation
const blog_server =  express();
blog_server.use(cors());
blog_server.use(express.json())
blog_server.use(routes)
blog_server.use('/uploads',express.static('./uploads'))







// 

// PORT creation
const PORT = 4500 || process.env.PORT 

// Middleware
blog_server.use(bodyParser.json()); 
blog_server.listen(PORT,()=>{
    console.log(`Server running on port ${PORT} and waiting for client request`) 
});

blog_server.get('/',(req,res)=>{
    res.send('Blog Server is up and running')  
})

blog_server.get('/test-firebase', async (req, res) => {
    try {
        const usersList = await admin.auth().listUsers(10); // List 10 users as a test
        res.status(200).json(usersList);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});
