//add logic for fake user
//based on user choice, then make fetch request to battle routes
//once the choice is made, like they choose fight and press enter, 
//the enter key press then makes the opponent logic
//server then determines what the fake user responds with
const router = require('express').Router();
const { Pokemon } = require('../../models');

router.post('/battle', (req, res) => {
  // battle logic
  res.json({ message: 'Battle Route Accessed'});
});

module.exports = router;