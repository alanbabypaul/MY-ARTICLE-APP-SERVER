
const admin = require('firebase-admin');


const authenticate = async (req, res, next) => {
  const token = req.headers.authorization?.split('Bearer ')[1];

  if (token) {
    try {
      const decodedToken = await admin.auth().verifyIdToken(token);
      req.user = decodedToken;
      // console.log('Authenticated user:', decodedToken); 
      next(); 
    } catch (error) {
      console.error('Error verifying token:', error);
      return res.status(401).json({ message: 'Invalid token' });
    }
  } else {
    return res.status(401).json({ message: 'No token provided' });
  }
  req.user = []
};

module.exports = authenticate;
