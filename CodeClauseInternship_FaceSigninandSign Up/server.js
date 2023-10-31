const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

// Serve the HTML file
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Serve static files (CSS and models)
app.use(express.static(path.join(__dirname, 'models')));
app.use(express.static(path.join(__dirname, 'style.css')));

// Mock user data (replace with a real database)
const users = [];

// Signup route
app.post('/signup', (req, res) => {
    const { username, facialData } = req.body;
    users.push({ username, facialData });
    res.status(200).json({ message: 'User signed up successfully' });
});

// Signin route
app.post('/signin', (req, res) => {
    const { username, facialData } = req.body;
    const user = users.find((u) => u.username === username);

    if (!user) {
        return res.status(401).json({ message: 'User not found' });
    }

    // Replace this with your facial recognition comparison logic
    if (user.facialData === facialData) {
        res.status(200).json({ message: 'User signed in successfully' });
    } else {
        res.status(401).json({ message: 'Invalid facial data' });
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
