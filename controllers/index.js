const router = require('express').Router();
const viewRouter = require('./home-routes');
const apiRouter = require('./api');
const loginRouter = require('./api/login-routes');
const quizRouter = require('./api/quiz-routes');
//const signupRouter = require('./api/user-routes');


router.use('/', viewRouter);
router.use('/api', apiRouter);
router.use('/login', loginRouter);
router.use('/quiz', quizRouter);
//router.use('/signup', signupRouter);


module.exports = router;
