// route.js
const express = require('express');
const router = express.Router();
const path = require('path');
const { getUsers, createUser, getUserById } = require('../controller/userController');

// Home route
router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

// Users route (example JSON)
router.get('/users', getUsers);
router.post('/addUser', createUser);
router.get('/user/:id', getUserById);


// POST example
router.post('/users', (req, res) => {
    const newUser = req.body; // Make sure you have express.json() middleware
    // Here you would normally save to DB
    res.status(201).json({ message: 'User created', user: newUser });
});

module.exports = router;
