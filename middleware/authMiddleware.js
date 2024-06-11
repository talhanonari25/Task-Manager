const jwt = require('jsonwebtoken');
const User = require('../models/User');

const protect = async (req, res, next) => {
  let token;
  if (
    req.headers.authorization
  ) {
    try {
      token = req.headers.authorization;
      const decoded = jwt.verify(token, 'Id5Lzy6koCe7zWedG6BNr579a/XrSGjb5/iYj/t8s7fz1NGj3CGovzy+dlBYVDV4');
      req.user = await User.findById(decoded.id).select('-password');
      next();
    } catch (error) {
      console.error(error);
      res.status(401).json({ message: 'Not authorized, token failed' });
    }
  }
  if (!token) {
    res.status(401).json({ message: 'Not authorized, no token' });
  }
};

module.exports = { protect };
