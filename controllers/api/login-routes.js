//DO WE NEED THIS SINCE THERES USER-ROUTES??
const router = require('express').Router();
const userRoutes = require('./user-routes');

router.use('/login', userRoutes);

const bcrypt = require('bcrypt');
const { User } = require('../../models');

// Login route
// POST /api/login

router.post('/', async (req, res) => {
  const { email , password } = req.body;
  console.log('email', email);
  console.log('password', password);
  try {
      // Find the user by username
      const user = await User.findOne({ where: { email } }); //changed from username
      // Check if user exists and verify the password
      console.log('user', user);
      console.log('user-pass', user.password);

      /*
      const validPassword = await bcrypt.compare(password, user.password);
      if (!user || !validPassword) {
          return res.status(401).send('Unauthorized');
          //document.location.replace('/signup');
        }
        */
      req.session.user_id = user.id;
      req.session.save(() => {
        //req.session.user_id = user.id;
        req.session.loggedIn = true;
        res.status(200).json(user);
        //res.json({ user: user, message: 'You are now logged in!' });

      });
  } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
  }
});

//added this to work with session
router.get('/login', async (req,res) => {
  try{
    if(req.session.loggedIn){
      const user = await User.findByPk(req.session.user_id);
      if(!user){
        throw new Error('User data not found');
      }
      res.render('profile', { user });
    } else{
      res.render('signup');
    }

  }catch (error){
    console.error(error);
  }
})

//maybe add login/signup here too

module.exports = router;
