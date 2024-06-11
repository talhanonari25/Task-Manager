const express = require('express');
const passport = require('passport');
const connectDB = require('./config/db');
const { logRequest } = require('./middleware/logMiddleware');
const { errorHandler } = require('./middleware/errorMiddleware');
const authRoutes = require('./routes/authRoutes');
const taskRoutes = require('./routes/taskRoutes');
const cron = require('node-cron');

const app = express();

connectDB();

app.use(express.json());
app.use(passport.initialize());
require('./config/passport')(passport);

app.use(logRequest);

app.use('/auth', authRoutes);
app.use('/tasks', taskRoutes);

app.use(errorHandler);

cron.schedule('* * * * *', () => {
  console.log('Running a task every minute');
});

const PORT = 4000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
