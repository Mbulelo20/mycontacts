const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs') // for encrypting user password on register
const jwt = require('jsonwebtoken')
const config = require('config')
const { check, validationResult } = require('express-validator');

const User = require('../models/User') // import user model

const checks = [
    check('name', 'Please enter your name').not().isEmpty(),
    check('email', 'Please enter a valid email').isEmail(),
    check('password', 'Please enter a password of 6 characters or more').isLength({min: 6})
]

router.post('/', checks, async (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()})
    }
    const { name, email, password} = req.body; //destructuring

    try {
        // if all fields are field properly, check if user already exists by checking email
        let user = await User.findOne({email})

        // if user exists:
        if(user){
            return res.status(400).json({msg: "User already exists"})
        }
        // if user doesn't exist, create one;
        user = new User({
            name, email, password
        })
        // encrypting the password
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt)

        await user.save();
        const payload = {
            user: {
                id: user.id
            }
        }

        jwt.sign(
            payload, 
            config.get('jwtSecret'), 
            {expiresIn: 360000},
            (error, token) => {
                if(error) throw error;
                res.json({token})
            }
            )
    } catch (error) {
        console.error(error.message);
        res.status(500).send('server error')
    }
})

module.exports = router;