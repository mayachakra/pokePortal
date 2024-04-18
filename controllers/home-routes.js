const router = require('express').Router();

router.get('/', (req, res) => {
  res.render('homepage');
});

router.get('/signup', (req, res) => {
  res.render('signup');
});

router.get('/quiz', (req, res) => {
  res.render('quiz');
});


module.exports = router;
