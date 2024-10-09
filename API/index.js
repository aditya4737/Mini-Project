import express from 'express';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from './models/user.js';  // Adjust the import if needed

const app = express();
const port = 3300; // Change as needed

// CORS setup to allow credentials (cookies)
const corsOptions = {
  origin: 'http://localhost:5173',  // Change this to your frontend URL
  credentials: true,  // Allow credentials (cookies)
};
app.use(cors(corsOptions));

// Middleware setup
app.use(express.json());
app.use(cookieParser());

// MongoDB connection
const dbUri = 'mongodb://localhost:27017/CaseSubmission';  // Update your MongoDB URI
mongoose.connect(dbUri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Failed to connect to MongoDB', err));

// User signup route
// User signup route
app.post('/api/auth/signup', async (req, res) => {
  const { first_name, email, password } = req.body;
console.log(first_name, email, password);

  try {
    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ name:first_name, email, password: hashedPassword });

    // Save the new user
    await newUser.save();

    // Generate JWT token
    const token = jwt.sign({ id: newUser._id }, "vedant007822900567", { expiresIn: '1h' });

    // Set token as a cookie
    res.cookie('token', token, { httpOnly: true,});

    return res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error('Signup error:', error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
});


// User login route
app.post('/api/auth/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    console.log(user);
    
    if (!user) {
      return res.status(400).json({ message: 'User not found' });
    }

    // Check if password matches
    const isMatch = await bcrypt.compare(password, user.password);
    console.log(isMatch);
    
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Generate JWT token
    const token = jwt.sign({ id: user._id },"vedant007822900567", { expiresIn: '1h' });

    // Set token as a cookie
    res.cookie('token', token, { httpOnly: true, });

    return res.status(200).json({ message: 'Login successful' });
  } catch (error) {
    console.error('Login error:', error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
});


// Protected Route
import { authMiddleware } from './middleware/authMiddleware.js';
app.get('/api/protected', authMiddleware, (req, res) => {
  res.status(200).json({ message: 'You have access to this protected route' });
});

app.post("/endpoint", async (req, res) => {
  const formData = req.body; 
  console.log("Received data:", formData);

  

  return res.status(200).json({ message: 'Login successful',id : 32 });
});


app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
