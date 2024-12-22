const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const app = express();
const port = 8000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
const mongoURI = "mongodb://localhost:27017/curd"; // Replace with your MongoDB URI
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;

db.on("error", console.error.bind(console, "MongoDB connection error:"));
db.once("open", () => {
  console.log("Connected to MongoDB");
});

// Mongoose Schema and Model
const userSchema = new mongoose.Schema({
  name: String,
  age: Number,
  city: String,
});

const User = mongoose.model("User", userSchema);

// Routes

// Display all the users
app.get("/users", async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: "Error retrieving users" });
  }
});

// Add new user details
app.post("/users", async (req, res) => {
  const { name, age, city } = req.body;
  if (!name || !age || !city) {
    return res.status(400).send({ message: "Please provide all the details" });
  }

  const user = new User({ name, age, city });
  try {
    await user.save();
    res.json({ message: "User added successfully" });
  } catch (err) {
    res.status(500).json({ message: "Error adding user" });
  }
});

// Update user details
app.patch("/users/:id", async (req, res) => {
  const { id } = req.params;
  const { name, age, city } = req.body;

  if (!name || !age || !city) {
    return res.status(400).send({ message: "Please provide all the details" });
  }

  try {
    const user = await User.findByIdAndUpdate(
      id,
      { name, age, city },
      { new: true }
    );
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json({ message: "User updated successfully" });
  } catch (err) {
    res.status(500).json({ message: "Error updating user" });
  }
});

// Delete user details
app.delete("/users/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const user = await User.findByIdAndDelete(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json({ message: "User deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Error deleting user" });
  }
});

// Start Server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
