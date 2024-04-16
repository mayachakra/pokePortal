const router = require('express').Router();
const viewRouter = require('./home-routes');
const apiRouter = require('./api');

router.use('/', viewRouter);
router.use('/api', apiRouter);

module.exports = router;
