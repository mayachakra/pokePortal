const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const express = require('express');
const { User } = require('../models');

const router = express.Router();

// Login route
router.post('/login', async (req, res) => {
    const { username, password } = req.body;

    try {
        // Find the user by username
        const user = await User.findOne({ where: { username } });

        // Check if user exists and verify the password
        if (!user || !bcrypt.compareSync(password, user.password)) {
            return res.status(401).send('Unauthorized');
        }

        // Generate a JWT token
        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '24h' });

        // Send the token as a response
        res.json({ token });
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

module.exports = router;
