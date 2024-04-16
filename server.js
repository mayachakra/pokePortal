const express = require("express");
const app = express();
require('dotenv').config(); // Load environment variables

// Middleware for parsing JSON and URL-encoded form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files from the 'public' folder
app.use(express.static("public"));

// Routes
const userRouter = require('./routes/user');
app.use('/api/users', userRouter);

// Error handling should be placed at the end, after all other middleware and routes
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
