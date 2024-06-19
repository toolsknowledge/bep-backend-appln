const mongoose = require('mongoose');
const config = require('config');
const connectDB = async () => {
  const db = config.get('mongoURI');
  try {
    await mongoose.connect(db, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB connected');
  } catch (err) {
    console.error(err.message);
    process.exit(1); // Exit process with failure
  }
};
module.exports = connectDB;
