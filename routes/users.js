const express = require('express');
const user = require('../models/users.js');

const router = express.Router();

// All routes in here are starting with /users

// Getting all users
router.get('/', async (req, res) => {
    try {
        const users = await user.find();
        res.json(users);
    } catch (err) {
        res.json({ message: err });
    }
});

// Getting user by id
router.get('/:userid', async (req, res) => {
    try {
        const User = await user.findById(req.params.userid);
        res.json(User);
    } catch (err) {
        res.json({ message: err });
    }
});

// Posting user details
router.post('/', async (req, res) => {
    const User = new user();
    User.firstName = req.body.firstName;
    User.lastName = req.body.lastName;
    User.age = req.body.age;
    try {
        const savedUser = await User.save();
        res.json(savedUser);
    } catch (err) {
        res.json({ message: err });
    }
});

// Delete a user
// router.delete('/:userid', async (req, res) => {
//     try {
//         const user = await User.remove({ _id: req.params.userid });
//         res.send('user deleted');
//     } catch (err) {
//         res.json({ message: err });
//     }
// });

module.exports = router;
