
const totalPokemon = 151;
const numberOfPokeballs = 5;
let numPokeballs = numberOfPokeballs
const pokemonContainer = document.getElementById('pokemon-container');
const returnBtn = document.getElementById('return-button');
returnBtn.style.display = 'none';

returnBtn.addEventListener('click', () => {
    window.location.href = "index.html";
});

const catchChance = document.getElementById('catch-chance');
const catchChanceText = document.createElement('p');
catchChanceText.className = 'catchball-text';
catchChanceText.innerHTML = `X ${numPokeballs}`;
const catchChanceImg = document.createElement('img');
catchChanceImg.src = 'pokeball.png';
catchChanceImg.className = 'catchball-img';
catchChance.appendChild(catchChanceImg);
catchChance.appendChild(catchChanceText);
catchChance.style.display = 'none';


const startBtn = document.getElementById('start-button');
startBtn.addEventListener('click', () => {
    pokemonContainer.style.display = 'flex';
    pokemonContainer.innerHTML = '';

    const introduzione = document.getElementById('introduzione');
    const pokeball = document.getElementById('pokeball');
    introduzione.style.display = 'none';
    pokeball.style.display = 'none';
    document.getElementById('reset').style.display = 'none';
    returnBtn.style.display = 'block';
    catchChance.style.display = 'block';
    numPokeballs = numberOfPokeballs;
    catchChanceText.innerHTML = `X ${numPokeballs}`;
    //display randomize 10 pokemon
    displayRandomPokemon(10);
    
});


function displayRandomPokemon(num) {
    
    for (let i = 0; i < num; i++) {
        const randomId = Math.floor(Math.random() * totalPokemon) + 1;
        fetch(`https://pokeapi.co/api/v2/pokemon/${randomId}`)
        .then(response => response.json())
        .then(pokemonData => {
            const pokemonCard = document.createElement('div');
                    pokemonCard.className = 'pokemon-card ' + 'light-'+pokemonData.types[0].type.name;

                    let pokeName = document.createElement('p');
                    let pokeId = document.createElement('p');
                    let pokeTypes = document.createElement('div');
                    let pokeImg = document.createElement('img');
                    let catchButton = document.createElement('button');
                    
                    
                    pokeImg.src = pokemonData.sprites.front_default;

                    pokeImg.className = "pokemon-image";
                    pokeName.className = "pokemon-name";
                    pokeId.className = "pokemon-id";
                    catchButton.className = 'catch-button';
                    catchButton.id = 'catch-button';

                    pokeName.innerHTML = `${pokemonData.name} <br>`;
                    pokeId.innerHTML = `n°${String(pokemonData.id).padStart(4,0)} <br>`;
                    catchButton.innerHTML = 'Catch';
                    catchButton.style.display = 'none';

                    pokemonData.types.forEach(pokeType => {
                        let type = document.createElement('div');
                        type.className = 'pokemon-type ' + pokeType.type.name;
                        type.innerHTML = pokeType.type.name;
                        pokeTypes.appendChild(type);
                    });

                    pokemonCard.appendChild(pokeId);
                    pokemonCard.appendChild(pokeImg);
                    pokemonCard.appendChild(pokeName);
                    pokemonCard.appendChild(pokeTypes);
                    

                    catchButton.addEventListener('click', () => {
                        randomCatchProbability = Math.floor(Math.random() * 100) + 1;
                        if (randomCatchProbability > 50) {
                        displayPopup(`<h2>You caught ${pokemonData.name}!</h2>`);
                        localStorage.setItem(pokemonData.id, pokemonCard.outerHTML);
                        updatePokemonNumber();
                        } else {
                            displayPopup(`<h2>You failed to catch ${pokemonData.name}!</h2>`);
                        }
                        pokemonCard.style.display = 'none';
                        numPokeballs--;
                        catchChanceText.innerHTML = `X ${numPokeballs}`;
                    });

                    pokemonCard.addEventListener('mouseover', () => {
                        catchButton.style.display = 'block';
                    });
                    pokemonCard.addEventListener('mouseout', () => {
                        catchButton.style.display = 'none';
                    });

                    pokemonCard.appendChild(catchButton);
                    pokemonContainer.appendChild(pokemonCard);
        })
        .catch(error => console.error('Errore nella richiesta di dettagli del Pokémon:', error));
    }
}

function displayPopup(content){
    const popup = document.createElement('div');
    const closeBtn = document.createElement('button');
    popup.className = 'popup';
    closeBtn.className = 'close-button';
    closeBtn.innerHTML = 'X';
    if(numPokeballs == 1){
        popup.innerHTML = `<h2>You have no more pokeballs! You need back home!</h2>`;
    }
    popup.innerHTML = content;
    popup.appendChild(closeBtn);

    
    closeBtn.addEventListener('click', () => {
        popup.style.display = 'none';
        if(numPokeballs == 0) {
            pokemonContainer.style.display = 'none';
            returnBtn.style.display = 'none';
            catchChance.style.display = 'none';
            document.getElementById('reset').style.display = 'block';
            const introduzione = document.getElementById('introduzione');
            introduzione.style.display = 'block';
            const professore_Oak_img = document.getElementById('professore-Oak-img');
            professore_Oak_img.src = 'pokemon-trainer-red.png'
            const testo = document.getElementById('introduzione-testo');
            testo.innerHTML = "Pokemon Trainer! why you are here? your adventure's not over!";
            const pokeball = document.getElementById('pokeball');
            pokeball.style.display = 'block';
        }
        
    });
    document.body.appendChild(popup);
}
function updatePokemonNumber() {
    const pokemonNumber = document.getElementById('pokemon-num');
    pokemonNumber.innerHTML = "MY POKEMON: " + localStorage.length;
}

function resetPokemon() {
    localStorage.clear();
    location.reload();
}

const resetBtn = document.getElementById('reset');
resetBtn.addEventListener('click', resetPokemon);
updatePokemonNumber();


