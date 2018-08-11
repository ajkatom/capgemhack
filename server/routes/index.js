const router = require('express').Router()

router.use('/users', require('./users'));
router.use('/user', require('./user'));

module.exports = router;
