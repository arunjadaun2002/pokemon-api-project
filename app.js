
const pokemonList = document.getElementById('pokemon-list');  
const searchBar = document.getElementById('search-bar'); 
const searchBtn = document.getElementById('search-btn');  

let pokemons = [];  


async function fetchPokemons() {
    try {
        const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=50'); 
        if (!response.ok) throw new Error('Failed to load Pokémon data.');
        
        const data = await response.json();
        pokemons = data.results;  
        displayPokemons(pokemons); 
    } catch (error) {
        pokemonList.innerHTML = `<p class="error">Error: ${error.message}</p>`;
    }
}


function displayPokemons(pokemonArray) {
    pokemonList.innerHTML = '';  
    
    pokemonArray.forEach(pokemon => {
        const pokemonItem = document.createElement('div');  
        pokemonItem.classList.add('pokemon-item');  
        pokemonItem.innerText = pokemon.name;  
        pokemonList.appendChild(pokemonItem); 
    });
}


function searchPokemon() {
    const data = searchBar.value.trim();
    if (!data) {
        alert("Please enter a Pokémon name.");
        return;  
    }

    const filteredPokemons = pokemons.filter(pokemon => pokemon.name.includes(data));
    
    if (filteredPokemons.length === 0) {
        pokemonList.innerHTML = '<p class="error">Pokémon not found.</p>';
    } else {
        displayPokemons(filteredPokemons); 
    }
}


searchBtn.addEventListener('click', searchPokemon);


fetchPokemons();
