const express = require('express');
const passport = require('passport');
const connectDB = require('./config/db');

const cron = require('node-cron');

const app = express();
connectDB();

app.use(express.json());
app.use(passport.initialize());
require('./config/passport')(passport);

cron.schedule('* * * * *', () => {
  console.log('Running a task every minute');
});

const PORT = 4000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
