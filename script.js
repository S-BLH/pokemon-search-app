// Retrieve DOM elements
const searchInput = document.getElementById('search-input');
const searchButton = document.getElementById('search-button');
const pokemonName = document.getElementById('pokemon-name');
const pokemonId = document.getElementById('pokemon-id');
const weight = document.getElementById('weight');
const height = document.getElementById('height');
const types = document.getElementById('types');
const hp = document.getElementById('hp');
const attack = document.getElementById('attack');
const defense = document.getElementById('defense');
const specialAttack = document.getElementById('special-attack');
const specialDefense = document.getElementById('special-defense');
const speed = document.getElementById('speed');
const sprite = document.getElementById('sprite');

// Add event listener to search button
searchButton.addEventListener('click', searchHandler);

searchInput.addEventListener('keydown', (event) => {
  if (event.key === 'Enter') {
    searchHandler();
  }
});

async function fetchPokemonData(query) {
  try {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${query}`);
    if (!response.ok) {
      throw new Error('Pokémon not found');
    }
    const pokemon = await response.json();
    displayPokemonInfo(pokemon);
  } catch (error) {
    console.error(error.message);
  }
}

function displayPokemonInfo(pokemon) {
  // Clear previous search results
  sprite.src = '';
  types.innerHTML = '';

  // Display Pokémon information
  pokemonName.textContent = pokemon.name.toUpperCase();
  pokemonId.textContent = `#${pokemon.id}`;
  weight.textContent = `Weight: ${pokemon.weight}`;
  height.textContent = `Height: ${pokemon.height}`;

  // Display Pokémon types
  pokemon.types.forEach(type => {
    const typeElement = document.createElement('div');
    typeElement.textContent = type.type.name.toUpperCase();
    types.appendChild(typeElement);
  });

  hp.textContent = pokemon.stats[0].base_stat;
  attack.textContent = pokemon.stats[1].base_stat;
  defense.textContent = pokemon.stats[2].base_stat;
  specialAttack.textContent = pokemon.stats[3].base_stat;
  specialDefense.textContent = pokemon.stats[4].base_stat;
  speed.textContent = pokemon.stats[5].base_stat;

  // Display Pokémon sprite
  sprite.src = pokemon.sprites.front_default;
}

function searchHandler() {
  const searchValue = searchInput.value.toLowerCase();
  fetchPokemonData(searchValue);
}