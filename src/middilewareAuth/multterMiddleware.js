
const multer = require('multer');
const path = require('path');


const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './uploads'); 
  },
  filename: (req, file, cb) => {
    const filename = `image-${Date.now()}-${file.originalname}`
    cb(null, filename);
  }
});

const filefilter = (req,file,callback)=>{
  if(file.mimetype === 'image/jpeg' || file.mimetype === 'image/png' || file.mimetype === 'image/jpeg'){
    callback(null, true);
  }else{
    callback(null, false);
    return callback(new Error('Only JPEG and PNG images are allowed.'));
  }
}


const multerConfig = multer({
  storage,filefilter
})

module.exports = multerConfig;
