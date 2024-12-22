const express = require("express");
const cors = require("cors");
const users = require("./sample.json");
const fs = require("fs");
const app = express();
const port = 8000;

app.use(cors());
app.use(express.json());

app.listen(port, (err) => {
  console.log(`Server is running on port ${port}`);
});

// Display all the users
app.get("/users", (req, res) => {
  return res.json(users);
});

// Delete user details
app.delete("/users/:id", (req, res) => {
  let id = Number(req.params.id);
  let filteredUsers = users.filter((user) => user.id !== id);
  fs.writeFile("./sample.json", JSON.stringify(filteredUsers), (err) => {
    if (err) {
      console.log(err);
    } else {
      return res.json(filteredUsers);
    }
  });
});

// Add new user details
app.post("/users", (req, res) => {
  let { name, age, city } = req.body;
  if (!name || !age || !city) {
    return res.status(400).send({ message: "Please provide all the details" });
  }
  let id = Date.now();
  users.push({ id, name, age, city });
  fs.writeFile("./sample.json", JSON.stringify(users), (err) => {
    if (err) {
      console.log(err);
    }
  });
  return res.json({ message: "User added successfully" });
});

// Update user details
app.patch("/users/:id", (req, res) => {
  let id = Number(req.params.id);
  let { name, age, city } = req.body;
  if (!name || !age || !city) {
    return res.status(400).send({ message: "Please provide all the details" });
  }
  let index = users.findIndex((user) => user.id === id);
  users.splice(index, 1, { ...req.body });
  fs.writeFile("./sample.json", JSON.stringify(users), (err) => {
    if (err) {
      console.log(err);
    }
  });
  return res.json({ message: "User updated successfully" });
});
