const express = require('express');
const router = express.Router();

// @route   POST api/users
// @desc Register a user
router.post('/', (req, res) => {
    res.send('Register')
})

module.exports = router;