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
console.log('function has been called just now ');

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

app.get('/api/data/formone', authMiddleware, async (req, res) => {
  console.log('the route has been called one' );
  try {
    console.log('the route has been called');
    
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
app.get('/api/data/formtwo', authMiddleware, async (req, res) => {
  console.log('the route has been called two');
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
app.get('/api/data/formthree', authMiddleware, async (req, res) => {
  console.log('the route has been called three');
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



// app.post('/api/formone', authMiddleware, async (req, res) => {
//   try {
//     console.log('Received formOne submission:', req.body);
//     if (!req.user) {
//       return res.status(401).json({ message: 'Unauthorized: User not found' });
//     }
//     const userId1 = req.user.id;  // This should log the authenticated user's ID
//     console.log('Authenticated user ID:', userId1);

//     const {
//       complainantName,
//       complainantContact,
//       respondentDetails,
//       childrenDetails,
//       incidents,
//       sexualViolence,
//       otherSexualAbuse,
//       verbalEmotionalAbuse,
//       otherVerbalAbuse,
//       economicViolence,
//       otherEconomicViolence,
//       additionalInfo
//     } = req.body;

//     const userId = req.user.id;  // Get user ID from the authenticated token

//     // Create a new Domestic Incident Report
//     const newIncidentReport = new DomesticIncidentReport({
//       complainantName,
//       complainantContact,
//       respondentDetails,
//       childrenDetails,
//       incidents,
//       sexualViolence,
//       otherSexualAbuse,
//       verbalEmotionalAbuse,
//       otherVerbalAbuse,
//       economicViolence,
//       otherEconomicViolence,
//       additionalInfo,
//       user: userId  // Link the logged-in user to the form submission
//     });

//     // Save the form data to MongoDB
//     await newIncidentReport.save();

//     // Send the success response and return
//     return res.status(201).json({ message: 'Form data submitted successfully', report: newIncidentReport });
//   } catch (error) {
//     console.error('Error submitting formOne:', error);
//     // Send the error response and return
//     return res.status(500).json({ message: 'Internal Server Error' });
//   }
// });


app.listen(port, () => {
  console.log('Server running on http://localhost:${port}');
});


// app.post('/api/formone', authMiddleware, async (req, res) => {
//   try {
//       console.log('Received formOne submission:', req.body); // This should log the full body
//       if (!req.user) {
//           return res.status(401).json({ message: 'Unauthorized: User not found' });
//       }
//       const userId = req.user.id;  // This should log the authenticated user's ID
//       console.log('Authenticated user ID:', userId);

//       // Destructure the received data
//       const {
//           complainantName,
//           complainantContact,
//           respondentDetails,
//           childrenDetails,
//           incidents,
//           sexualViolence,
//           otherSexualAbuse,
//           verbalEmotionalAbuse,
//           otherVerbalAbuse,
//           economicViolence,
//           otherEconomicViolence,
//           additionalInfo
//       } = req.body;

//       // Create a new Domestic Incident Report
//       const newIncidentReport = new DomesticIncidentReport({
//           complainantName,
//           complainantContact,
//           respondentDetails,
//           childrenDetails,
//           incidents,
//           sexualViolence,
//           otherSexualAbuse,
//           verbalEmotionalAbuse,
//           otherVerbalAbuse,
//           economicViolence,
//           otherEconomicViolence,
//           additionalInfo,
//           user: userId
//       });

//       // Save the form data to MongoDB
//       await newIncidentReport.save();
//       return res.status(201).json({ message: 'Form data submitted successfully', report: newIncidentReport });
//   } catch (error) {
//       console.error('Error submitting formOne:', error);
//       return res.status(500).json({ message: 'Internal Server Error' });
//   }
// });
app.post('/api/formone', authMiddleware, async (req, res) => {
  try {
      console.log('Received formOne submission:', req.body);
      if (!req.user) {
          return res.status(401).json({ message: 'Unauthorized: User not found' });
      }
      const userId = req.user.id;
      console.log('Authenticated user ID:', userId);

      // Destructure the received data according to the new schema
      const {
          complainantName,
          complainantContact,
          respondents, // Adjusted to match the schema
          children, // Adjusted to match the schema
          incidents, // Adjusted to match the schema
          violenceType, // Adjusted to match the schema
          additionalInfo // Adjusted to match the schema
      } = req.body;

      // Create a new Domestic Incident Report
      const newIncidentReport = new DomesticIncidentReport({
          complainantName,
          complainantContact,
          respondents, // Use the adjusted variable
          children, // Use the adjusted variable
          incidents, // Use the adjusted variable
          violenceType, // Use the adjusted variable
          additionalInfo,
          user: userId // Reference to the authenticated user
      });

      // Save the form data to MongoDB
      await newIncidentReport.save();
      return res.status(201).json({ message: 'Form data submitted successfully', report: newIncidentReport });
  } catch (error) {
      console.error('Error submitting formOne:', error);
      return res.status(500).json({ message: 'Internal Server Error' });
  }
});
