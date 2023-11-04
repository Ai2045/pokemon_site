const pokemonContainer = document.getElementById("pokemon-container");



const keys = Object.keys(localStorage);
let numPokemon = keys.length;
const numPokemonText = document.getElementById("pokemon-num");
numPokemonText.innerHTML = `MY POKEMON: ${numPokemon}`;


keys.forEach(key => {
    const pokemonData = localStorage.getItem(key);
    const parser = new DOMParser();
    const pokemonDOM = parser.parseFromString(pokemonData, "text/html");
    const newpokemonCard = pokemonDOM.body.firstChild;
    newpokemonCard.querySelector(".catch-button").style.display = "none";

    const detailsButton = document.createElement("button");
    detailsButton.style.display = "none";
    detailsButton.className = "details-button";
    detailsButton.innerHTML = "Details";
    detailsButton.addEventListener("click", () => {
        window.location.href = "pokemon.html?id=" + key;
    });

    const deleteButton = document.createElement("button");
    deleteButton.style.display = "none";
    deleteButton.className = "delete-button";
    deleteButton.innerHTML = "X";
    deleteButton.addEventListener("click", () => {
        
        localStorage.removeItem(key);
        newpokemonCard.remove();
        numPokemon--;
        numPokemonText.innerHTML = `MY POKEMON: ${numPokemon}`;

    });
    newpokemonCard.appendChild(detailsButton);
    newpokemonCard.appendChild(deleteButton);
    pokemonContainer.appendChild(newpokemonCard);

    newpokemonCard.addEventListener("mouseover", () => {
        detailsButton.style.display = "block";
        deleteButton.style.display = "block";
    });

    newpokemonCard.addEventListener("mouseout", () => {
        detailsButton.style.display = "none";
        deleteButton.style.display = "none";
    });
    
});

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

const showPokemonButton = document.getElementById('show-pokemon-button');
showPokemonButton.addEventListener('click', () => {
    window.location.href = "pokedex.html";
});