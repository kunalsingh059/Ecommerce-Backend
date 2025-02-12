const jwt = require('jsonwebtoken');

// Middleware to check if the user is authenticated
const authenticateJWT = (req, res, next) => {
  // Get the token from the Authorization header
  const token = req.header('Authorization') && req.header('Authorization').split(' ')[1];

  // If no token is found, return an error
  if (!token) {
    return res.status(401).json({ message: 'Access denied. No token provided.' });
  }

  // Verify the token
  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ message: 'Invalid token.' });
    }

    // Add the decoded user to the request object and call the next middleware/route handler
    req.user = user;
    next();
  });
};

module.exports = authenticateJWT;
