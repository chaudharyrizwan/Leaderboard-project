require('dotenv').config();
const mongoose = require('mongoose');
const User = require('./models/User');

const dbUrl = process.env.ATLASDB_URL;

const users = [
  { name: "Rahul" },
  { name: "Kamal" },
  { name: "Sanak" },
  { name: "Pooja" },
  { name: "Rizwan" },
  { name: "karan" },
  { name: "Arjun" },
  { name: "Simran" },
  { name: "Zaid" },
  { name: "Sarik" },
];

mongoose
  .connect(dbUrl)
  .then(async () => {
    console.log("Connected to MongoDB");

    // Optional: clear old data
    await User.deleteMany({});
    console.log("Old users deleted");

    await User.insertMany(users);
    console.log("Initial users added");

    mongoose.disconnect();
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB:", err);
  });
