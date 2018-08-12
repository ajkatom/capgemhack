const router = require('express').Router();

router.use('/users', require('./users'));
router.use('/user', require('./user'));
router.use('/facedetector', require('./facedetector'));
const db = require('../db');

db.sync();

module.exports = router;
