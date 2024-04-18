const router = require('express').Router();
const viewRouter = require('./home-routes');
const apiRouter = require('./api');
const signupRouter = require('./signup-routes');
const profileRouter = require('./profile-page-routes');

router.use('/', viewRouter);
router.use('/api', apiRouter);
router.use('/signup', signupRouter);
router.use('/profile', profileRouter);

module.exports = router;
