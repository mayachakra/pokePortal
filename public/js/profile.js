//event handling for buttons to either battle page or quiz page
//Dependencies
const pokedexBtn = document.querySelector('#pokedex');
const menuBtn = document.querySelector('#menu-btn');
const battleBtn = document.querySelector('#battle');
const sidebar = document.querySelector('#sidebar');
const main = document.querySelector('#main');
const pokeContainer = document.querySelector('#poke-container');
// Data
const pokemonCount = 150;
const colors = {
  fire: '#FDDFDF',
  grass: '#DEFDE0',
  electric: '#FCF7DE',
  dragon: '#DEF3FD',
  ground: '#f4e7da',
  rock: '#d5d5d4',
  fairy: '#fceaff',
  poison: '#98d7a5',
  bug: '#f8d5a3',
  water: '#97b3e6',
  psychic: '#eaeda1',
  flying: '#F5F5F5',
  fighting: '#E6E0D4',
  normal: '#f5f5f5',
};
// Array of main Pokemon types
const mainTypes = Object.keys(colors);
// Functions========================
// Function to fetch Pokemon data from the API
const fetchPokemons = async () => {
  // Loop to fetch data for each Pokemon
  for (let i = 1; i <= pokemonCount; i++) {
    // Fetch data for the current Pokemon
    await getPokemon(i);
  }
};

// Function to fetch data for a specific Pokemon by its ID
const getPokemon = async (id) => {
  const url = `https://pokeapi.co/api/v2/pokemon/${id}/`; // URL for fetching Pokemon data
  const res = await fetch(url); // Fetch data from the API
  const data = await res.json(); // Convert response to JSON format
  // Function to format the name of the Pokemon
  function formatPokemonName(pokemonName) {
    // Replace "-" with "."
    return pokemonName.replace('-', '.');
  }
  // Modify the name property of the Pokemon data
  data.name = formatPokemonName(data.name);
  // Create a card for the Pokemon with the modified data
  createPokemonCard(data);
};

// Function to create a card for a Pokemon
const createPokemonCard = (pokemon) => {
  // Create a div element for the Pokemon card
  const pokemonEl = document.createElement('div');
  // Capitalize the first letter of the Pokemon name
  const name = pokemon.name[0].toUpperCase() + pokemon.name.slice(1);
  // Pad the Pokemon ID with zeros to make it three digits
  const id = pokemon.id.toString().padStart(3, '0');
  // Extract the types of the Pokemon
  const pokeTypes = pokemon.types.map((type) => type.type.name);
  // Find the main type of the Pokemon
  const type = mainTypes.find((type) => pokeTypes.indexOf(type) > -1);
  // Get the color corresponding to the main type
  const color = colors[type];
  // Add CSS classes and styles to the Pokemon card
  pokemonEl.classList.add(
    'relative',
    'flex',
    'flex-col',
    'justify-center',
    'items-center',
    'h-96',
    'w-60',
    'rounded',
    'm-5'
  );
  pokemonEl.style.backgroundColor = color;

  // HTML content for the Pokemon card
  const pokemonInnerHtml = ` 
  <div
  class='relative flex flex-col justify-center items-center h-96 w-60 rounded m-5'
>
  <span
    class='rounded-full bg-fontcolor opacity-60 w-24 h-24 absolute left-18 top-16'
  ></span>
  <img
    src='https://projectpokemon.org/images/normal-sprite/${pokemon.name}.gif'
    alt=''
    class='h-20 w-20 z-10'
  />
  <p
    class='p-2 bg-blackbackground opacity-90 font-arcade text-fontcolor text-xs rounded-md mt-5 mb-5'
  >#${id}</p>
  <h3 class='font-arcade text-blackbackground mb-7'>${name}</h3>
  <p class='font-arcade text-blackbackground text-xs'>Type:${type}</p>
</div>`;
  // Set HTML content for the Pokemon card
  pokemonEl.innerHTML = pokemonInnerHtml;
  // Append the Pokemon card to the pokeContainer
  pokeContainer.appendChild(pokemonEl);
};
// Call the fetchPokemons function to start fetching Pokemon data
fetchPokemons();

menuBtn.addEventListener('click', () => {
  sidebar.classList.toggle('hidden');
});

pokedexBtn.addEventListener('click', () => {
  main.classList.toggle('hidden');
});
