const router = require('express').Router();

router.get('/', (req, res, next) => {
  console.log('ok');
});

module.exports = router;
