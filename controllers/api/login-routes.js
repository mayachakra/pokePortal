//DO WE NEED THIS SINCE THERES USER-ROUTES??
const router = require('express').Router();
const userRoutes = require('./user-routes');

router.use('/login', userRoutes);

router.get('/', (req, res) => {
  // login is in user-routes
  // response
  res.render('login');
});

module.exports = router;
