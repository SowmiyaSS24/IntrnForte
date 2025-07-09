const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const User = require('../models/User');

// Register
router.get('/register', (req, res) => {
    res.sendFile(__dirname + '/../views/register.html');
});

router.post('/register', async (req, res) => {
    const { username, email, password, role } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({ username, email, password: hashedPassword, role });
    await user.save();
    res.redirect('/login');
});

// Login
router.get('/login', (req, res) => {
    res.sendFile(__dirname + '/../views/login.html');
});

router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (user && await bcrypt.compare(password, user.password)) {
        req.session.userId = user._id;
        req.session.role = user.role;
        res.redirect('/dashboard');
    } else {
        res.send('Invalid credentials');
    }
});

// Dashboard
router.get('/dashboard', (req, res) => {
    if (!req.session.userId) return res.redirect('/login');
    res.sendFile(__dirname + '/../views/dashboard.html');
});

module.exports = router;
