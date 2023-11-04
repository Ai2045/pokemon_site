const pokemonContainer = document.getElementById("pokemon-container");

const numPokemonText = document.getElementById("pokemon-num");


const allPokemon = 151;
numPokemonText.innerHTML = `ALL POKEMON: ${allPokemon}`;

//fetch all pokemon data and make cards
for (let i = 1; i <= allPokemon; i++) {
    fetch(`https://pokeapi.co/api/v2/pokemon/${i}`)
        .then(response => response.json())
        .then(pokemonData => {
            const pokemonCard = document.createElement('div');
                    pokemonCard.className = 'pokemon-card ' + 'light-'+pokemonData.types[0].type.name;
                    let pokeName = document.createElement('p');
                    let pokeId = document.createElement('p');
                    let pokeTypes = document.createElement('div');
                    let pokeImg = document.createElement('img');

                    pokeImg.src = pokemonData.sprites.front_default;

                    pokeImg.className = "pokemon-image";
                    pokeName.className = "pokemon-name";
                    pokeId.className = "pokemon-id";

                    pokeName.innerHTML = `${pokemonData.name} <br>`;
                    pokeId.innerHTML = `n°${String(pokemonData.id).padStart(4,0)} <br>`;

                    pokemonData.types.forEach(pokeType => {
                        let type = document.createElement('div');
                        type.className = 'pokemon-type ' + pokeType.type.name;
                        type.innerHTML = pokeType.type.name;
                        pokeTypes.appendChild(type);
                    });

                    const detailsButton = document.createElement("button");
                    detailsButton.style.display = "none";
                    detailsButton.className = "details-button";
                    detailsButton.innerHTML = "Details";
                    detailsButton.addEventListener("click", () => {
                        window.location.href = "pokemon.html?id=" + pokemonData.id;
                    });


                    
                    pokemonCard.appendChild(pokeId);
                    pokemonCard.appendChild(pokeImg);
                    pokemonCard.appendChild(pokeName);
                    pokemonCard.appendChild(pokeTypes);
                    pokemonCard.appendChild(detailsButton);

                    pokemonCard.addEventListener("mouseover", () => {
                        detailsButton.style.display = "block";
                    });

                    pokemonCard.addEventListener("mouseout", () => {
                        detailsButton.style.display = "none";
                    });
                    pokemonContainer.appendChild(pokemonCard);
                })
                .catch(error => console.error('Errore nella richiesta di dettagli del Pokémon:', error));
            }

//make filterPokemon function
function filterPokemon(type_value){
    const selectedType = type_value;
    const pokemonCards = document.querySelectorAll(".pokemon-card");

    pokemonCards.forEach(pokemonCard => {
        const typeElement = pokemonCard.querySelector(".pokemon-type");
        const typeName = typeElement.textContent.toLowerCase();

        if (selectedType === "all" || typeName.includes(selectedType)) {
            pokemonCard.style.display = "block";
        } else {
            pokemonCard.style.display = "none";
        }
    });
}

const getMyPokemonButton = document.getElementById('my-pokemon-button');
getMyPokemonButton.addEventListener('click', () => {
    window.location.href = "pokebox.html";
});