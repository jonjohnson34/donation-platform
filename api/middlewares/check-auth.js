const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, process.env.JWT_KEY);
    req.userData = {  email: decodedToken.email, 
                      userID: decodedToken.userID, 
                      role: decodedToken.role, 
                      first_name: decodedToken.first_name, 
                      last_name: decodedToken.last_name,
                      phone_number: decodedToken.phone_number
                    };
    next();
  } catch (error) {
    res.status(401).json({ message: 'Auth failed!', error: error });
  }
}
