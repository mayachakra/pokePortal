const router = require('express').Router();

const userRoutes = require('./user-routes');
const battleRoutes = require('./user-routes');
const quizRoutes = require('./user-routes');
const loginRouter = require('./login-routes');

router.use('/login', loginRouter);
router.use('/user',userRoutes);
router.use('/battle',battleRoutes);
router.use('/quiz',quizRoutes);


module.exports = router;
