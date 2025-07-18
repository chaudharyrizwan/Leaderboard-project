const express = require('express')
const router = express.Router()
const User = require('../models/User')

// Get all users
router.get('/', async (req, res) => {
  const users = await User.find()
  res.json(users)
})

// Add new user
router.post('/', async (req, res) => {
  const { name } = req.body;

  // Check if name is missing
  if (!name) {
    return res.status(400).json({ message: 'Username is required.' });
  }

  // Allow only names with:
  // - at least 4 characters
  // - only letters, numbers, or underscores
  // - must include at least one letter
  const usernameRegex = /^(?=.*[a-zA-Z])[a-zA-Z0-9_]{4,}$/;

  if (!usernameRegex.test(name)) {
    return res.status(400).json({
      message:
        'Username must be at least 4 characters and only contain letters, numbers, or underscores. It must include at least one letter.'
    });
  }

  // Check if username already exists (case insensitive)
  const existingUser = await User.findOne({ name: { $regex: new RegExp(`^${name}$`, 'i') } });

  if (existingUser) {
    return res.status(409).json({ message: 'Username already exists. Please choose another one.' });
  }

  try {
    const newUser = new User({ name });
    await newUser.save();
    res.status(201).json(newUser);
  } catch (err) {
    console.error('Error saving user:', err);
    res.status(500).json({ message: 'Something went wrong while creating the user.' });
  }
});

module.exports = router