
const admin = require('firebase-admin');


const authenticateReuse = async (req, res, next) => {
  if(req.user){
    next()
  }else{
    res.send(401)
  }
};

module.exports = authenticateReuse;
