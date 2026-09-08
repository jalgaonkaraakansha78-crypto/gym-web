const express = require('express');
const { createContact, getContacts, deleteContact } = require('../controllers/contactController');
const { protect } = require('../middleware/auth');

const router = express.Router();

router.post('/', createContact);
router.get('/', protect, getContacts);
router.delete('/:id', protect, deleteContact);

module.exports = router;
