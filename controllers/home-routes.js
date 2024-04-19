const router = require('express').Router();

router.get('/', (req, res) => {
  res.render('homepage');
});

router.get('/signup', (req, res) => {
  if (req.session.logged_in) {
    res.render('profile', { user: req.session.user });
    //return res.redirect('/profile');
  }
  res.render('signup');
});

router.get('/quiz', (req, res) => {
  res.render('quiz');
});

//ADDED CHANGES
router.get('/login', (req, res) => {
  if (req.session.logged_in) {
    res.render('profile', { user: req.session.user });
    //return res.redirect('/profile');
  }
  res.render('login');
});

//ADDED THESE CHANGES
//profile page routes
router.get('/profile', (req, res) => {
  res.render('profile', { user: req.session.user });
  //res.render('profile');
});

module.exports = router;
