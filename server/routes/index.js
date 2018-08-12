const router = require('express').Router();

router.use('/users', require('./users'));
router.use('/user', require('./user'));
router.use('/facedetector', require('./facedetector'));
router.use('/response', require('./response'));
const db = require('../db');

db.sync()
  .then(() => {
    console.log('Synced database');
    console.log('Seeding database');
    db.seed();
  })
  .then(() => console.log('Seeding successful'))
  .catch(err => {
    console.error('Error while seeding');
    console.error(err.stack);
  });

module.exports = router;
