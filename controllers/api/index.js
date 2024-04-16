const router = require('express').Router();
const loginRouter = require('./login-routes');

router.use('/login', loginRouter);

module.exports = router;
