const mongoose = require('mongoose');

const childSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  dob: {
    type: Date,
    required: true,
  },
  gender: {
    type: String,
    required: true,
    trim: true,
    enum: ['Male', 'Female', 'Other'],
  },
  class: {
    type: String,
    required: true,
    trim: true,
  },
  curriculum: {
    type: String,
    required: true,
    trim: true,
  },
  school: {
    type: String,
    required: true,
    trim: true,
  },
  medium_of_instruction: {
    type: String,
    required: true,
    trim: true,
  },
  first_language: {
    type: String,
    required: true,
    trim: true,
  },
  second_language: {
    type: String,
    required: true,
    trim: true,
  },
  third_language: {
    type: String,
    required: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
  },
  image_url: {
    type: String,
    trim: true,
    match: [/^https?:\/\/[^\s]+$/, 'Please include a valid URL'],
  },
  audio_url: {
    type: String,
    trim: true,
    match: [/^https?:\/\/[^\s]+$/, 'Please include a valid URL'],
  },
  tier: {
    type: String,
    trim: true,
    enum: ['Free', 'Basic', 'Premium'],
  },
  subscription_start_date: {
    type: Date,
  },
  subscription_end_date: {
    type: Date,
  },
});

const signupSchema = new mongoose.Schema({
  parent_reg_number: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    match: [/^\d{10}$/, 'Please include a valid 10-digit mobile number'],
  },
  parent_password: {
    type: String,
    required: true,
  },
  parent_name: {
    type: String,
    required: true,
    trim: true,
  },
  parent_surname: {
    type: String,
    required: true,
    trim: true,
  },
  parent_alternate_number: {
    type: String,
    trim: true,
    match: [/^\d{10}$/, 'Please include a valid 10-digit alternate mobile number'],
  },
  parent_email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  },
  country: {
    type: String,
    required: true,
    trim: true,
  },
  pincode: {
    type: String,
    required: true,
    trim: true,
    match: [/^\d{6}$/, 'Please include a valid pincode'],
  },
  state: {
    type: String,
    required: true,
    trim: true,
  },
  city: {
    type: String,
    required: true,
    trim: true,
  },
  district: {
    type: String,
    required: true,
    trim: true,
  },
  mother_tongue: {
    type: String,
    required: true,
    trim: true,
  },
  child: {
    type: [childSchema],
    required: true,
  }
}, {
  timestamps: true,
  collection: 'signup',
});

module.exports = mongoose.model('Signup', signupSchema);
