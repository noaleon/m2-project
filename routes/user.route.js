const express = require('express');
const router = express.Router();

router.get('/user-profile', (req, res) => {
  res.send('ok');
});

module.exports = router;
