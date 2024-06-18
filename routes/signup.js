const express = require('express');
const bcrypt = require('bcryptjs');
const Signup = require('../models/schema/signupSchema');
const { validateSignup } = require('../middleware/validators/validateSignup');
const signup = express.Router();
// Signup route
signup.post('/', validateSignup, async (req, res) => {
  const {
    parent_reg_number,
    parent_password,
    parent_name,
    parent_surname,
    parent_alternate_number,
    parent_email,
    country,
    pincode,
    state,
    city,
    district,
    mother_tongue,
    child
  } = req.body;

  try {
    // Check if the user already exists
    let user = await Signup.findOne({ parent_reg_number });
    if (user) {
      return res.status(400).json({ msg: 'User already exists' });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedParentPassword = await bcrypt.hash(parent_password.toString(), salt);

    // Check if child is an array and hash the children's passwords
    let hashedChildren = [];
    if (Array.isArray(child)) {
      hashedChildren = await Promise.all(child.map(async (c) => {
        const hashedChildPassword = await bcrypt.hash(c.password.toString(), salt);
        return { ...c, password: hashedChildPassword };
      }));
    }

    // Create a new user
    user = new Signup({
      parent_reg_number,
      parent_password: hashedParentPassword,
      parent_name,
      parent_surname,
      parent_alternate_number,
      parent_email,
      country,
      pincode,
      state,
      city,
      district,
      mother_tongue,
      child: hashedChildren,
    });

    await user.save();
    res.status(201).json({ signup: 'success' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});
module.exports = signup;
