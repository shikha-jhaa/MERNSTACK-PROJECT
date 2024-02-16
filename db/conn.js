const mongoose = require('mongoose');
const DB = process.env.DATABASE;
console.log('DB:', DB); // Add this line
mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    // usecreateIndex: true,
    // usefindAndModify: false,
  })
  .then(() => {
    console.log('MongoDB connected successfully');
  })
  .catch((err) => {
    console.error('MongoDB connection error:', err.message);
  });
