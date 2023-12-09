const mongoose = require('mongoose');

const connectionString = 'mongodb://localhost:27017/taskplannerdb';

mongoose.connect(connectionString, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB database');
  })
  .catch((error) => {
    console.error('Database connection error:', error);
  });

module.exports = mongoose;
