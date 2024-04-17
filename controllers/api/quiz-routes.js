//post request from front end interacts with this
//server processess quiz submission
const express = require('express');
const router = express.Router();
const { User, Pokemon } = require('../../models');
const fetch = require('node-fetch');

async function personalPokemon(answers) {
  //implement logic to determine which pokemon matches the users answers
  //implement scoring
  try {
    //assuming the last answer determines the Pokemon type
    //(example lets say: "How would you handle a stressful situation"
    // 1. headfirst (fire) 2. finding balance (earth) 3. remain calm (air) 4. go with the flow(water))
    // where the parenthesis saves the value for the display answer (ex. headfirst) as the value (fire)
    const finalAnswer = answers[answers.length - 1].toLowerCase();
    const apiUrl = `https://pokeapi.co/api/v2/type/${finalAnswer}`; //maybe need to change link?
    const response = await fetch(apiUrl);
    const typeData = await response.json();

    if (!typeData || typeData.pokemon) {
      throw new Error('Failed to fetch data');
    }
    const pokemonNames = typeData.pokemon.map((p) => p.pokemon.name);
    const randomPokemon = Math.floor(Math.random() * pokemonNames.length);
    const randomPokemonName = pokemonNames[randomPokemon];
    return {
      name: randomPokemonName,
      type: finalAnswer.charAt(0).toUpperCase() + finalAnswer.slice(1),
    };
    //capitalizes the type and returns the pokemon type for the user
  } catch (error) {
    console.error('Error submiting quiz:', error);
    return { name: 'Unknown', type: 'Normal' };
    //res.status(500).json({ error: 'Failed to submit quiz'});
  }
}

router.post('/quiz', async (req, res) => {
  try {
    const { userId } = req.session;
    const { answers } = req.body;

    const assignedPokemon = personalPokemon(answers);
    const user = await User.findByPk(userId);
    if (!user) {
      throw new Error('User not found');
    }
    const createdPokemon = await Pokemon.create({
      name: assignedPokemon.name,
      type: assignedPokemon.type,
      trainer_id: userId,
    });
    res
      .status(200)
      .json({
        message: 'Quiz submitted successfully',
        pokemon: createdPokemon,
      });
    //returns pokemon for user
  } catch (error) {
    console.error('Error submiting quiz:', error);
    res.status(500).json({ error: 'Failed to submit quiz' });
  }
});

module.exports = router;
