const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.send('Fetch contacts')
})

router.post('/', (req, res) => {
    res.send('Add contact')
})

router.delete('/:id', (req, res) => {
    res.send('Delete contact')
})

router.put('/:id', (req, res) => {
    res.send('Update contact')
})
module.exports = router;