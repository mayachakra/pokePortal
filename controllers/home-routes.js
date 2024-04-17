const router = require('express').Router();

router.get('/homepage', (req, res) => {
  res.render('homepage');
});

router.get('/signup', (req, res) => {
  res.render('signup');
});

module.exports = router;
