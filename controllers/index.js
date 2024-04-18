const router = require('express').Router();
const viewRouter = require('./home-routes');
const apiRouter = require('./api');
const signupRouter = require('./signup-routes');
const quizRouter = require('./api/quiz-routes')

router.use('/', viewRouter);
router.use('/api', apiRouter);
router.use('/signup', signupRouter)
router.use('/quiz', quizRouter)

module.exports = router;
