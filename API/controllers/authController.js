import bcrypt from 'bcryptjs';
import User from '../models/user.js';

// Controller to handle user registration
const signup = async (req, res) => {
  const { first_name, last_name, email, password, confirm_password } = req.body;

  // Check if all required fields are present
  if (!first_name || !last_name || !email || !password || !confirm_password) {
    return res.status(400).json({ message: 'Please fill all fields.' });
  }

  // Password validation
  if (password !== confirm_password) {
    return res.status(400).json({ message: 'Passwords do not match.' });
  }

  try {
    // Check if the user already exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: 'User already exists.' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const newUser = new User({
      first_name,
      last_name,
      email,
      password: hashedPassword,
    });

    // Save user to database
    await newUser.save();

    // Respond with success
    res.status(201).json({
      message: 'User registered successfully!',
      user: {
        first_name: newUser.first_name,
        last_name: newUser.last_name,
        email: newUser.email,
      },
    });
  } catch (error) {
    console.error('Error registering user:', error);
    res.status(500).json({ message: 'Server error. Please try again later.' });
  }
};

export { signup };
