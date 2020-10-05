const express = require('express');
const connectDB = require('./config/db');

const app = express();

// Connect Database
connectDB();

// Init Middleware

app.use(express.json({ exteded: false }));

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization, x-auth-token'
  );
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, PATCH, PUT, DELETE, OPTIONS'
  );
  // res.setHeader('Access-Control-Allow-Credentials', true);
  next();
});

// Define routes

app.use('/api/v1/users', require('./routes/api/v1/users'));
app.use('/api/v1/profile', require('./routes/api/v1/profile'));
app.use('/api/v1/auth', require('./routes/api/v1/auth'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
