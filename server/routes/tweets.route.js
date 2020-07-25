const express = require('express'),
  router = express.Router();

router.get('/', (req, res, next) => {
    console.log('here')
    res.send({ data: 'tweets' })
})

module.exports = router;
