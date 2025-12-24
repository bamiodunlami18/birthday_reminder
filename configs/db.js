const mongoose = require('mongoose');
mongoose
  .connect(process.env.DB_STRING)
  .then(() => {
    console.log('db connected');
  })
  .catch(() => {
    console.log('db not connected');
  });

module.exports = mongoose;
