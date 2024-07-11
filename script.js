const searchInput = document.getElementById('search-input');
const searchButton = document.getElementById('search-button');

function displayPokemonInfo(pokemon) {
  // Clear previous search results
  document.getElementById('sprite').src = '';
  document.getElementById('types').innerHTML = '';

  // Display Pokémon information
  document.getElementById('pokemon-name').textContent = pokemon.name.toUpperCase();
  document.getElementById('pokemon-id').textContent = `#${pokemon.id}`;
  document.getElementById('weight').textContent = `Weight: ${pokemon.weight}`;
  document.getElementById('height').textContent = `Height: ${pokemon.height}`;

  // Display Pokémon types
  pokemon.types.forEach((type) => {
    const typeElement = document.createElement('div');
    typeElement.textContent = type.type.name.toUpperCase();
    document.getElementById('types').appendChild(typeElement);
  });

  document.getElementById('hp').textContent = pokemon.stats[0].base_stat;
  document.getElementById('attack').textContent = pokemon.stats[1].base_stat;
  document.getElementById('defense').textContent = pokemon.stats[2].base_stat;
  document.getElementById('special-attack').textContent = pokemon.stats[3].base_stat;
  document.getElementById('special-defense').textContent = pokemon.stats[4].base_stat;
  document.getElementById('speed').textContent = pokemon.stats[5].base_stat;

  // Display Pokémon sprite
  document.getElementById('sprite').src = pokemon.sprites.front_default;
}

async function fetchPokemonData(query) {
  try {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${query}`);
    if (!response.ok) {
      throw new Error('Pokémon not found');
    }
    const pokemon = await response.json();
    displayPokemonInfo(pokemon);
  } catch (error) {
    console.log(error.message);
    document.getElementById('pokemon-name').textContent = 'Pokémon not found';
    document.getElementById('pokemon-id').textContent = '';
    document.getElementById('weight').textContent = '';
    document.getElementById('height').textContent = '';
    document.getElementById('types').innerHTML = '';
    document.getElementById('hp').textContent = '';
    document.getElementById('attack').textContent = '';
    document.getElementById('defense').textContent = '';
    document.getElementById('special-attack').textContent = '';
    document.getElementById('special-defense').textContent = '';
    document.getElementById('speed').textContent = '';
    document.getElementById('sprite').src = '';
  }
}

searchButton.addEventListener('click', async () => {
  const query = searchInput.value.toLowerCase();
  await fetchPokemonData(query);
});

searchInput.addEventListener('keydown', async (event) => {
  if (event.key === 'Enter') {
    const query = searchInput.value.toLowerCase();
    await fetchPokemonData(query);
  }
});