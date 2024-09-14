const API_URL = 'https://pokeapi.co/api/v2/pokemon/';

async function getPokemonData(id) {
    const response = await fetch(`${API_URL}${id}`);
    const data = await response.json();
    return data;
}

function showPokemon(pokemon) {
    const card = document.querySelector('.pokemon-card');
    const img = card.querySelector('.silhouette');
    const input = card.querySelector('.guess-input');
    const detailsDiv = document.querySelector('.pokemon-details');
    const nameSpan = document.getElementById('pokemon-name');
    const typeSpan = document.getElementById('pokemon-type');
    const abilitiesSpan = document.getElementById('pokemon-abilities');
    const playAgainBtn = document.getElementById('play-again');

    
    img.src = pokemon.sprites.other['official-artwork'].front_default;
    img.style.filter = "brightness(0)"; 

    
    input.addEventListener('change', function () {
        const guess = input.value.toLowerCase();
        if (guess === pokemon.name) {
            document.body.style.backgroundImage = url('C:/Users/SHREYA MISHRA/Desktop/pokemon-guessing/image/final.jpg');
            img.style.filter = "brightness(1)"; 
            alert(`Correct! It's ${pokemon.name}`);
            
            nameSpan.textContent = pokemon.name;
            typeSpan.textContent = pokemon.types.map(typeInfo => typeInfo.type.name).join(', ');
            abilitiesSpan.textContent = pokemon.abilities.map(abilityInfo => abilityInfo.ability.name).join(', ');
            detailsDiv.style.display = 'block';
        } else {
            alert("Try again!");
        }
    });
    playAgainBtn.addEventListener('click', function () {
        detailsDiv.style.display = 'none'; 
        input.value = ''; 
        getRandomPokemon(); 
    });
}

function getRandomPokemon() {
    const randomId = Math.floor(Math.random() * 151) + 1;
    getPokemonData(randomId).then(pokemon => {
        showPokemon(pokemon);
    });
}

getRandomPokemon();