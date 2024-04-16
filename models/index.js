const User = require('./User');
const Pokemon = require('./Pokemon');

//include hasMany and other relations here
//user can have many pokemons, pokemon can only have one trainer
User.hasMany(Pokemon, {

});

module.exports = {User, Pokemon};