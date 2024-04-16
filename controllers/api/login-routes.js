const router = require('express').Router();

router.get('/', (req, res) => {
  // login logic

  // response
  res.json({
    message: 'Login successful',
    user: {
      name: 'Nikola',
    },
  });
});

module.exports = router;
