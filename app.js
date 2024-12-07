// Declare the variables
const pokemonList = document.getElementById('pokemon-list');  // The element where the Pokémon will be displayed
const searchBar = document.getElementById('search-bar');  // The search input field
const searchBtn = document.getElementById('search-btn');  // The search button

let pokemons = [];  // Array to hold the fetched Pokémon data

// Function to fetch Pokémon data from the API
async function fetchPokemons() {
    try {
        const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=50');  // Fetch the first 50 Pokémon
        if (!response.ok) throw new Error('Failed to load Pokémon data.');
        
        const data = await response.json();
        pokemons = data.results;  // Store the fetched Pokémon data
        displayPokemons(pokemons);  // Display the Pokémon
    } catch (error) {
        pokemonList.innerHTML = `<p class="error">Error: ${error.message}</p>`;
    }
}

// Function to display Pokémon in the list
function displayPokemons(pokemonArray) {
    pokemonList.innerHTML = '';  // Clear any previous Pokémon displayed
    
    pokemonArray.forEach(pokemon => {
        const pokemonItem = document.createElement('div');  // Create a new div for each Pokémon
        pokemonItem.classList.add('pokemon-item');  // Add a class for styling
        pokemonItem.innerText = pokemon.name;  // Set the Pokémon name as the text
        pokemonList.appendChild(pokemonItem);  // Append to the list
    });
}

// Function to handle the search functionality
function searchPokemon() {
    const query = searchBar.value.trim().toLowerCase();  // Get the search query and remove extra spaces
    if (!query) {
        alert("Please enter a Pokémon name.");
        return;  // If the query is empty, do nothing
    }

    const filteredPokemons = pokemons.filter(pokemon => pokemon.name.toLowerCase().includes(query));  // Filter Pokémon by name
    
    if (filteredPokemons.length === 0) {
        pokemonList.innerHTML = '<p class="error">Pokémon not found.</p>';
    } else {
        displayPokemons(filteredPokemons);  // Display the filtered list
    }
}

// Event listener for the search button
searchBtn.addEventListener('click', searchPokemon);

// Fetch Pokémon data when the page loads
fetchPokemons();
