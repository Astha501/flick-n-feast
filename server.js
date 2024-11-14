const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const path = require('path');


// MongoDB connection string
const dbUrl = "mongodb+srv://asthasaimohanty501:DFyq1fAq8GorxQ9q@cluster0.0te9y.mongodb.net/Project?retryWrites=true&w=majority";


// Connect to MongoDB
mongoose.connect(dbUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log("MongoDB connected");
}).catch(err => {
    console.error("MongoDB connection error:", err);
});

// Define User Schema
const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
});

const User = mongoose.model('User', userSchema);

const app = express();
const port = process.env.PORT || 8080;

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files
app.use(express.static(__dirname));

// Registration endpoint
app.post('/register', async (req, res) => {
    const { username, password, confirm_password } = req.body;

    if (!username || !password || !confirm_password) {
        return res.status(400).send("All fields are required.");
    }
    
    if (password !== confirm_password) {
        return res.status(400).send("Passwords do not match.");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
        username,
        password: hashedPassword,
    });

    try {
        await newUser.save();
        res.sendFile(path.join(__dirname, 'index.html'));
    } catch (err) {
        if (err.code === 11000) {
            return res.status(400).send("Username already exists.");
        }
        res.status(500).send("Server error");
    }
});

// Login endpoint
app.post('/login', async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).send("All fields are required.");
    }

    const user = await User.findOne({ username });

    if (!user) {
        return res.status(401).send("Invalid username or password.");
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
        return res.status(401).send("Invalid username or password.");
    }

    res.sendFile(path.join(__dirname, 'index.html'));
});

// Start the server
app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});
