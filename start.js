require('dotenv').config();
const mongoose = require('mongoose');

// Connect to MongoDB without deprecated options
mongoose.connect(process.env.DATABASE)
  .then(() => {
    console.log('Mongoose connection open');
  })
  .catch((err) => {
    console.log(`Connection error: ${err.message}`);
  });

require('./models/Registration');
const app = require('./app');

const server = app.listen(3000, () => {
  console.log(`Express is running on port ${server.address().port}`);
});
