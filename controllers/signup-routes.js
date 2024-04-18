const router = require('express').Router();

router.get('/', (req, res) => {
  res.render('signup');
});

router.post('/signup', (req, res) => {
  res.redirect('/login');
});

module.exports = router;
