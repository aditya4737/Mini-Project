import express from 'express';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from './models/user.js';  // Adjust the import if needed
import { DomesticIncidentReport } from './models/form.js';
import { authMiddleware } from './middleware/authMiddleware.js';
import FormTwo from './models/formtwo.js';
import FormThree from './models/formthree.js';


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
const dbUri = 'mongodb://localhost:27017/case';  // Update your MongoDB URI
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
    console.log('token is ',res.cookie);
    return res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error('Signup error:', error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
});





app.post('/api/auth/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find the user by email
    const user = await User.findOne({ email });
    console.log("User object:", user); // Debug user object
    
    if (!user) {
      return res.status(400).json({ message: 'User not found' });
    }

    // Check if password matches
    const isMatch = await bcrypt.compare(password, user.password);
    console.log("Password match:", isMatch); // Debug password match result
    
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Log the user ID
    console.log("User ID for token:", user._id);

    // Generate JWT token
    const token = jwt.sign({ id: user._id }, "vedant007822900567", { expiresIn: '1h' });

    // Log the generated token for debugging
    console.log("Generated JWT Token:", token);

    if (!token) {
      throw new Error('Token generation failed');
    }

    // Set token as a cookie
    res.cookie('token', token, { httpOnly: true });

    // Send success response
    return res.status(200).json({ message: 'Login successful', token });
  } catch (error) {
    console.error('Login error:', error.message);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
});
//get routes

app.get('/api/formone', authMiddleware, async (req, res) => {
  try {
    const userId = req.user.id; // Get authenticated user's ID
    const formOneData = await DomesticIncidentReport.findOne({ user: userId }); // Fetch FormOne data for user

    if (!formOneData) {
      return res.status(404).json({ message: 'Form One data not found' });
    }else{
      console.log(formOneData);
    }

    return res.status(200).json(formOneData);
  } catch (error) {
    console.error('Error fetching FormOne:', error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
});

// GET route for FormTwo
app.get('/api/formtwo', authMiddleware, async (req, res) => {
  try {
    const userId = req.user.id; // Get authenticated user's ID
    const formTwoData = await FormTwo.findOne({ user: userId }); // Fetch FormTwo data for user

    if (!formTwoData) {
      return res.status(404).json({ message: 'Form Two data not found' });
    }

    return res.status(200).json(formTwoData);
  } catch (error) {
    console.error('Error fetching FormTwo:', error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
});

// GET route for FormThree
app.get('/api/formthree', authMiddleware, async (req, res) => {
  try {
    const userId = req.user.id; // Get authenticated user's ID
    const formThreeData = await FormThree.findOne({ user: userId }); // Fetch FormThree data for user

    if (!formThreeData) {
      return res.status(404).json({ message: 'Form Three data not found' });
    }
    console.log('formthree data recived',formThreeData);

    return res.status(200).json(formThreeData);
  } catch (error) {
    console.error('Error fetching FormThree:', error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
});



// Protected Route

app.get('/api/protected', authMiddleware, (req, res) => {
  res.status(200).json({ message: 'You have access to this protected route' });
});

app.post("/endpoint", async (req, res) => {
  const formData = req.body; 
  console.log("Received data:", formData);

  

  return res.status(200).json({ message: 'Login successful',id : 32 });
});


app.post('/api/formtwo', authMiddleware, async (req, res) => {
 
  try {
    console.log('Received formOne submission:', req.body);
    const userId1 = req.user.id;  // This should log the authenticated user's ID
    console.log('Authenticated user ID:', userId1);
    // Extract form data from request body
    const {
      sexualViolence,
      verbalEmotionalAbuse,
      economicViolence,
      additionalInformation
    } = req.body;
   
    if (!req.user) {
      return res.status(401).json({ message: 'Unauthorized: User not found' });
    }
    const userId = req.user.id;

    // Create a new FormTwo document
    const formTwoSubmission = new FormTwo({
      user: userId,  // Attach the authenticated user's ID
      sexualViolence,
      verbalEmotionalAbuse,
      economicViolence,
      additionalInformation,
      user:userId
    });

    // Save the form data to the database
    const savedForm = await formTwoSubmission.save();

    // Return a success response
    return res.status(201).json({
      message: 'FormTwo data submitted successfully',
      form: savedForm
    });
  } catch (error) {
    console.error('Error submitting FormTwo:', error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
});



app.post('/api/formthree', authMiddleware, async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: 'Unauthorized: No user found' });
    }

    const userId = req.user.id;

    // Extract form data from request body
    const { dowryDemands, dowryRelatedHarassment, protectionOrder, otherOrderDetails, legalOrders, attachedDocuments, assistanceOptions } = req.body;

    // Create a new FormThree document
    const formThreeSubmission = new FormThree({
      user: userId, // Attach the authenticated user's ID
      dowryDemands,
      dowryRelatedHarassment,
      protectionOrder,
      otherOrderDetails,
      legalOrders,
      attachedDocuments,
      assistanceOptions,
      user:userId
    });

    // Save the form data to the database
    const savedForm = await formThreeSubmission.save();

    // Return a success response
   console.log('form three data',savedForm);
    return res.status(201).json({ message: 'Form data submitted successfully', report: savedForm });
    
  } catch (error) {
    console.error('Error submitting formthree:', error);
    // Send the error response and return
    return res.status(500).json({ message: 'Internal Server Error' });
  }
});



app.post('/api/formone', authMiddleware, async (req, res) => {
  try {
    console.log('Received formOne submission:', req.body);
    if (!req.user) {
      return res.status(401).json({ message: 'Unauthorized: User not found' });
    }
    const userId1 = req.user.id;  // This should log the authenticated user's ID
    console.log('Authenticated user ID:', userId1);

    const {
      complainantName,
      complainantContact,
      respondentDetails,
      childrenDetails,
      incidents,
      sexualViolence,
      otherSexualAbuse,
      verbalEmotionalAbuse,
      otherVerbalAbuse,
      economicViolence,
      otherEconomicViolence,
      additionalInfo
    } = req.body;

    const userId = req.user.id;  // Get user ID from the authenticated token

    // Create a new Domestic Incident Report
    const newIncidentReport = new DomesticIncidentReport({
      complainantName,
      complainantContact,
      respondentDetails,
      childrenDetails,
      incidents,
      sexualViolence,
      otherSexualAbuse,
      verbalEmotionalAbuse,
      otherVerbalAbuse,
      economicViolence,
      otherEconomicViolence,
      additionalInfo,
      user: userId  // Link the logged-in user to the form submission
    });

    // Save the form data to MongoDB
    await newIncidentReport.save();

    // Send the success response and return
    return res.status(201).json({ message: 'Form data submitted successfully', report: newIncidentReport });
  } catch (error) {
    console.error('Error submitting formOne:', error);
    // Send the error response and return
    return res.status(500).json({ message: 'Internal Server Error' });
  }
});


app.listen(port, () => {
  console.log('Server running on http://localhost:${port}');
});

//form two

// import express from 'express';
// import mongoose from 'mongoose';
// import cookieParser from 'cookie-parser';
// import cors from 'cors';
// import bcrypt from 'bcryptjs';
// import jwt from 'jsonwebtoken';
// import User from './models/user.js';
// import FormTwo from './models/formtwo.js';
// import { authMiddleware } from './middleware/authMiddleware.js';

// const app = express();
// const port = 3300;

// const corsOptions = {
//   origin: 'http://localhost:5173',
//   credentials: true,
// };
// app.use(cors(corsOptions));
// app.use(express.json());
// app.use(cookieParser());

// const dbUri = 'mongodb://localhost:27017/case';
// mongoose.connect(dbUri, { useNewUrlParser: true, useUnifiedTopology: true })
//   .then(() => console.log('Connected to MongoDB'))
//   .catch(err => console.error('Failed to connect to MongoDB', err));

// // User signup route
// app.post('/api/auth/signup', async (req, res) => {
//   const { first_name, email, password } = req.body;
//   try {
//     const existingUser = await User.findOne({ email });
//     if (existingUser) return res.status(400).json({ message: 'User already exists' });

//     const hashedPassword = await bcrypt.hash(password, 10);
//     const newUser = new User({ name: first_name, email, password: hashedPassword });
//     await newUser.save();

//     const token = jwt.sign({ id: newUser._id }, "vedant007822900567", { expiresIn: '1h' });
//     res.cookie('token', token, { httpOnly: true });
//     return res.status(201).json({ message: 'User registered successfully' });
//   } catch (error) {
//     return res.status(500).json({ message: 'Internal Server Error' });
//   }
// });

// // User login route
// app.post('/api/auth/login', async (req, res) => {
//   const { email, password } = req.body;
//   try {
//     const user = await User.findOne({ email });
//     if (!user) return res.status(400).json({ message: 'User not found' });

//     const isMatch = await bcrypt.compare(password, user.password);
//     if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

//     const token = jwt.sign({ id: user._id }, "vedant007822900567", { expiresIn: '1h' });
//     res.cookie('token', token, { httpOnly: true });
//     return res.status(200).json({ message: 'Login successful' });
//   } catch (error) {
//     return res.status(500).json({ message: 'Internal Server Error' });
//   }
// });

// // Formtwo submission route (Protected)
// app.post("/api/formtwo", authMiddleware, async (req, res) => {
//   const { forcedIntercourse, forcedPornography, forcedEntertainment, otherSexualAbuse } = req.body;

//   try {
//     const formTwoData = new FormTwo({
//       userId: req.user._id,
//       forcedIntercourse,
//       forcedPornography,
//       forcedEntertainment,
//       otherSexualAbuse
//     });

//     await formTwoData.save();
//     res.status(201).json({ message: 'Form data saved successfully', data: formTwoData });
//   } catch (error) {
//     res.status(500).json({ message: 'Server error' });
//   }
// });

// app.listen(port, () => {
//   console.log(`Server running on http://localhost:${port}`);
// });


// User login route
// app.post('/api/auth/login', async (req, res) => {
//   const { email, password } = req.body;

//   try {
//     const user = await User.findOne({ email });
//     console.log(user);
    
//     if (!user) {
//       return res.status(400).json({ message: 'User not found' });
//     }

//     // Check if password matches
//     const isMatch = await bcrypt.compare(password, user.password);
//     console.log(isMatch);
    
//     if (!isMatch) {
//       return res.status(400).json({ message: 'Invalid credentials' });
//     }

//     // Generate JWT token
//     const token = jwt.sign({ id: user._id },"vedant007822900567", { expiresIn: '1h' });

//     // Set token as a cookie
//     res.cookie('token', token, { httpOnly: true, });

//     return res.status(200).json({ message: 'Login successful' });
//   } catch (error) {
//     console.error('Login error:', error);
//     return res.status(500).json({ message: 'Internal Server Error' });
//   }
// });