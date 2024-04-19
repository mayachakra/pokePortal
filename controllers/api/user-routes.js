const router = require('express').Router();
const bcrypt = require('bcrypt');
const express = require('express');
const fs = require('fs');
const path = require('path');
//const { User } = require('../models');

const { User } = require('../../models');
const withAuth = require('../../utils/auth');

const dataPath = path.join(__dirname,'./userData.json'); 
console.log('data path', dataPath);


//const signupRouter = require('./api/user-routes');

//router.use('/signup', signupRouter);



router.post('/', async (req, res) => {
  try {
    const {username, password} =req.body;
    // Encrypt the password before storing it in the database
    const hashedPassword = bcrypt.hashSync(password, 8); // salt rounds should be enough to ensure security but consider your app's performance requirements

    // Create the user with the hashed password
    // const userData = await User.create({
    //   ...req.body,
    //   password: hashedPassword,
    // });
    const userData = await User.create({
      username,
      password: hashedPassword,
    });

    let existing_data = [];


    try{
      const data = fs.readFileSync(dataPath);
      console.log('Data Path:', data);
      existing_data = JSON.parse(data);
      console.log('Existing Data:', existing_data);
    } catch(err){
      console.error('Error', err);
    }
    existing_data.push(userData);
    console.log('Existing Data w/ PUSH:', existing_data);
    try{
      fs.writeFileSync(dataPath, JSON.stringify(existing_data, null, 2));
    }catch(error){
      console.error('write to json error', error);
    }

    req.session.user= userData;
    // Initialize user session upon signup
    req.session.save(() => {
      req.session.loggedIn = true;
      res.status(200).json({ message: 'user created successfully, check json file', user: userData});

      // Respond with JSON data to trigger client-side redirection
      // res.json({ redirectUrl: '/profile' });
      //res.status(200).json(userData);
    });
  } catch (err) {
    console.error('Signup error:', err);
    res
      .status(400)
      .json({ message: 'Unable to create account. Please try again.' });
  }
});

router.post('/', async (req, res) => {
  try {
    const userData = await User.create(req.body);

    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.loggedIn = true;

      res.status(200).json(userData);
    });
  } catch (err) {
    res.status(400).json(err);
  }
});

// Login route
//withAuth only on quiz and profile pages
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    // Find the user by username
    const user = await User.findOne({ where: { email } }); //changed from username

    // Check if user exists and verify the password
    if (!user || !bcrypt.compareSync(password, user.password)) {
      return res.status(401).send('Unauthorized');
      //return res.redirect('/signup');
    }

    req.session.user_id = user.id;
    req.session.save(() => {
      //req.session.user_id = user.id;
      req.session.loggedIn = true;
      res.status(200).json(user);
      //res.json({ user: user, message: 'You are now logged in!' });
    });

    // Send the token as a response
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

router.post('/logout', (req, res) => {
  if (req.session.logged_in) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

module.exports = router;
