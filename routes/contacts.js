const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const {check, validationResult} = require('express-validator')

const User = require('../models/User')
const Contact = require('../models/Contact')
checks = [
    check('name', 'Name is required')
    .not()
    .isEmpty()
]

router.get('/', auth, async (req, res) => {
    try {
        const contacts = await Contact.find({user: req.user.id}).sort({date: -1});
        res.json(contacts);
    } catch (error) {
        console.erroror(error.message);
        res.status(500).send('Server Error..');
    }
});
// add a new contact, 
//private route so auth added
router.post(
    '/',
    [   
        auth, 
        checks
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({errors: errors.array()})
        }

        const { name, email, phone, type} = req.body;

        try {
            const newContact = new Contact({
                name,
                email,
                phone,
                type,
                user: req.user.id // auth wiil give the user based on id
            });

            const contact = await newContact.save();
            res.json(contact);
        } catch (error) {
            console.error(error.message);
            res.status(500).send('Server Error')

        }
    }
);

// @route PUT api/contacts/:id
// @desc Update contact
// @access Private
router.put('/:id', auth, async (req, res) => {
    const {name, email, phone, type} = req.body;

    // building a contact object since this is an update, this checks field that are included in the update
    const contactFields = {};
    if(name) contactFields.name = name;
    if(email) contactFields.email = email;
    if(phone) contactFields.phone = phone;
    if(type) contactFields.type = type;

    try {
        let contact = await Contact.findById(req.params.id);

        if(!contact) return res.status(404).json({msg: 'Contact does not exist'});

        //to make sure user owns contact. This prevents any person from updating another person's contacts in the backend
        if(contact.user.toString() !== req.user.id){
            return res.status(401).json({msg: 'Not authorised'});
        }
        //affter all, actual update
        contact = await Contact.findByIdAndUpdate(req.params.id, {$set: contactFields}, {new: true}); // {new: true}, optional, if object doesnt exist just create it

        res.json(contact);
    } catch (err) {
        console.error(er.message);
        res.status(500).send('Server error')
    }
});


// @route Delete api/contacts/:id/..
// @desc Delete contact
// @access Private
router.delete('/:id', auth, async (req, res) => {
    try {
        let contact = await Contact.findById(req.params.id);

        if(!contact) return res.status(404).json({msg: 'Contact does not exist'});

        //to make sure user owns contact, user must not delete someone else's contact
        if(contact.user.toString() !== req.user.id){
            return res.status(401).json({msg: 'Not authorised'});
        }
        await Contact.findByIdAndRemove(req.params.id);
        res.json({msg: 'Contact removed'})
    } catch (err) {
        console.error(er.message);
        res.status(500).send('Server error')
    }




});
module.exports = router;