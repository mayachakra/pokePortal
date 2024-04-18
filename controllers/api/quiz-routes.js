//post request from front end interacts with this
//server processess quiz submission
const express = require('express');
const router = require('express').Router();
const { User, Pokemon } = require('../../models');
const fetch = require('node-fetch');

async function personalPokemon(answers) {
  //implement logic to determine which pokemon matches the users answers
  //implement scoring
  try {
    const finalAnswer = answers[answers.length - 1].toLowerCase();
    const apiUrl = `https://pokeapi.co/api/v2/pokemon`; //maybe need to change link?
    //https://pokeapi.co/api/v2/type/{add type from user input ex. "grass"}/
    const response = await fetch(apiUrl);
    const pokeData = await response.json();

    if (!pokeData || pokeData.results) {
      throw new Error('Failed to fetch data');
    }
    
    const pokemonTypeName = pokeData.results   
        .filter(pokemon => pokemon.types.some(type => type.type.name === finalAnswer))
        .map(pokemon => pokemon.name);
    
    if (pokemonTypeName.length === 0){
        error.message(`No pokemon found for this type`);
    }
    const randomPokemonNum = Math.floor(Math.random() * pokemonNames.length);
    const randomPokemonName = pokemonTypeName[randomPokemonNum];
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

// POST /api/quiz
router.post('/', async (req, res) => {
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
