const express = require('express');
const router = express.Router();
const { getEmergencyContact } = require('../controllers/sosController');

router.get('/emergency-contact/:userId', getEmergencyContact);

module.exports = router;