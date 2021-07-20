const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs') // for encrypting user password on register
const jwt = require('jsonwebtoken')
const config = require('config')
const { check, validationResult } = require('express-validator');
const auth = require('../middleware/auth')
const User = require('../models/User') // import user model


const checks = [
    check('email', 'Please enter a valid email').isEmail(),
    check('password', 'Password required').isLength({min: 6})
]

router.post('/', checks, async (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()})
    }
    const {email, password} = req.body; //destructuring

    try {
        let user = await User.findOne({email})
        if(!user){
            return res.status(400).json({msg: "User does not exist"})
        }

        // if user exists, check password
        const isMatch = await bcrypt.compare(password, user.password)
        if(!isMatch){
            return res.status(400).json({msg: "Incorrect password"})
        }
        const payload = {       // payload is the object to send in the token.
            user: {             // we send the user id
                id: user.id
            }
        }

        // Generate the token
        jwt.sign(
            payload, 
            config.get('jwtSecret'), 
            {expiresIn: 360000}, // optional
            (error, token) => {
                if(error) throw error;
                res.json({token})
            }
        )
    } catch (error) {
        console.error(error.message)
        res.status(500).send('Server error')
    }

})

router.get('/', auth, async (req, res) => {  //added auth to protect this route
    try {
        const user = await User.findById(req.user.id).select('-password');
        res.json(user)
    } catch (error) {
        console.error(error.message)
        res.status(500).send('Server error')
    }
})



module.exports = router;