const User = require('./User');
const Pokemon = require('./Pokemon');
const Profile = require('./Profile');

// User can have many Pokemons, Pokemon can only have one trainer
User.hasMany(Pokemon, {
  foreignKey: 'userId',
  onDelete: 'CASCADE',
});

Pokemon.belongsTo(User, {
  foreignKey: 'userId',
});

module.exports = { User, Pokemon, Profile };
