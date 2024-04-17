const router = require('express').Router();
const { Pokemon, User } = require('../../models');
const fetch = require('node-fetch'); // Make sure to require 'node-fetch'

async function getPokemonData(pokemonName) {
  try {
    const response = await fetch(
      `https://pokeapi.co/api/v2/pokemon/${pokemonName}`
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error:', error);
  }
}

function simulateBattle(playerPokemon, opponentPokemon) {
  const playerAttack = playerPokemon.attack;
  const opponentDefense = opponentPokemon.defense;

  if (playerAttack > opponentDefense) {
    return `${playerPokemon.name} wins the battle!`;
  } else if (playerAttack < opponentDefense) {
    return `${opponentPokemon.name} wins the battle!`;
  } else {
    return "It's a tie!";
  }
}

function getOpponentMove() {
  const moves = ['attack', 'defend', 'heal']; // Add more moves as needed
  const randomIndex = Math.floor(Math.random() * moves.length);
  return moves[randomIndex];
}
// POST /api/battle
router.post('/', async (req, res) => {
  try {
    const { playerMove, playerPokemonId } = req.body;

    const playerPokemon = await Pokemon.findByPk(playerPokemonId);
    if (!playerPokemon) {
      return res.status(404).json({ error: 'Player Pokémon not found' });
    }

    const opponentMove = getOpponentMove(); // Get the opponent's move

    const opponentPokemon = await Pokemon.findOne({
      where: {
        /* opponent selection logic */
      },
    });
    if (!opponentPokemon) {
      return res.status(404).json({ error: 'Opponent Pokémon not found' });
    }

    const playerData = await getPokemonData(playerPokemon.name);
    const opponentData = await getPokemonData(opponentPokemon.name);

    const result = simulateBattle(playerData, opponentData);

    res.json({
      message: 'Battle updated',
      data: result,
      opponentMove, // Include the opponent's move in the response
    });
  } catch (error) {
    console.error('Error during battle:', error);
    res.status(500).json({ error: 'Failed to process battle' });
  }
});

module.exports = router;

//add logic for fake user
//based on user choice, then make fetch request to battle routes
//once the choice is made, like they choose fight and press enter,
//the enter key press then makes the opponent logic
//server then determines what the fake user responds with
