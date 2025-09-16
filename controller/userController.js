// controllers/userController.js

// Example user data
const users = [
    { id: 1, name: 'Bilawal' },
    { id: 2, name: 'Irtiza' }
];

// Get all users
const getUsers = (req, res) => {
    res.json(users);
};

// Create a new user
const createUser = (req, res) => {
    const newUser = req.body;
    // Normally you would save to a database
    users.push(newUser); // adding to array as example
    res.status(201).json({ message: 'User created', user: newUser });
};

// Get user by ID
const getUserById = (req, res) => {
    const userId = parseInt(req.params.id); // Get ID from route parameter
    const user = users.find(u => u.id === userId);

    if (!user) {
        return res.status(404).json({ message: 'User not found' });
    }

    res.json(user);
};

module.exports = {
    getUsers,
    createUser,
    getUserById
};
