// Import required modules
if(process.env.NODE_ENV != "production"){
    require("dotenv").config();
}
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const userRoutes = require('./routes/userRoutes');
const claimRoutes = require('./routes/claimRoutes');

// Create express app
const app = express();

// Middleware to parse JSON and enable CORS
app.use(express.json());
app.use(cors()); // Allow frontend (e.g., Vite/React) to talk to backend

app.use('/api/users', userRoutes)
app.use('/api/claim', claimRoutes)

// Read MongoDB URL from .env
const dbUrl = process.env.ATLASDB_URL;

// MongoDB Connection
main()
  .then(() => {
    console.log("Connected to MongoDB Atlas");
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
  });

async function main() {
  await mongoose.connect(dbUrl);
}

app.get('/', (req, res) => {
  res.send('Leaderboard API is running 🏆');
});


// Start the server on port 8080
app.listen(8080, () => {
  console.log("Server is running on http://localhost:8080");
});
