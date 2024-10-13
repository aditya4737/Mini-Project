// import jwt from 'jsonwebtoken';
// import User from '../models/user.js';
// export const authMiddleware = (req, res, next) => {
//   const token = req.cookies.token;

//   if (!token) {
//     return res.status(403).json({ message: 'No token provided' });
//   }

//   try {
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     req.user = decoded;
//     next();
//   } catch (error) {
//     return res.status(401).json({ message: 'Invalid or expired token' });
//   }
// };
// middleware/authMiddleware.js

// import jwt from 'jsonwebtoken';
// import User from '../models/user.js'; // Import the User model

// export const authMiddleware = async (req, res, next) => {
//   const token = req.headers.authorization?.split(' ')[1]; 

//   if (!token) {
//     return res.status(401).json({ message: 'Unauthorized: No token provided' });
//   }

//   try {
//     // Verify token
//     const decoded = jwt.verify(token, "vedant007822900567");
//     req.user = await User.findById(decoded.id).select('-password');  // Attach the user to the request, excluding password
//     next();
//     if (!req.user) {
//       return res.status(401).json({ message: 'User not found' });
//     }

//     next();  // Proceed to the next middleware or route handler
//   } catch (error) {
//     return res.status(403).json({ message: 'Invalid or expired token' });
//   }
// };
import jwt from 'jsonwebtoken';
import User from '../models/user.js'; // Import the User model

export const authMiddleware = async (req, res, next) => {
  // Get the token from the Authorization header
  const token = req.headers.authorization?.split(' ')[1]; 

  // If no token is provided, respond with 401 (Unauthorized)
  if (!token) {
    return res.status(401).json({ message: 'Unauthorized: No token provided' });
  }

  try {
    // Verify token
    const decoded = jwt.verify(token, "vedant007822900567");

    // Find the user by ID (excluding the password)
    const user = await User.findById(decoded.id).select('-password');
    
    // If user not found, return an error
    if (!user) {
      return res.status(401).json({ message: 'User not found' });
    }

    // Attach user to request object and proceed to next middleware/route
    req.user = user;
    next();
  } catch (error) {
    // If token is invalid or expired, return 403 (Forbidden)
    return res.status(403).json({ message: 'Invalid or expired token' });
  }
};
