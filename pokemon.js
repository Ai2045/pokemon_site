
        // Recupera l'ID del Pokémon dalla query string
        const queryString = window.location.search;
        const urlParams = new URLSearchParams(queryString);
        const id = urlParams.get('id');

        const backButton = document.getElementById('back-button');
        backButton.addEventListener('click', () => {
            window.history.back();
        });
        // Recupera i dati del Pokémon dall'API
        fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
        .then(response => response.json())
        .then(pokemonData => {
            // Crea la pagina dei dettagli del Pokémon
            const pokemon = document.getElementById('pokemon');
            const pokemonStatistics = document.createElement('div');
            pokemonStatistics.className = 'pokemon-statistics';

            const pokemonDetails = document.createElement('div');
            const pokemonName = document.createElement('p');
            pokemonName.className = 'pokemon-name';
            pokemonName.innerHTML = pokemonData.name;

            const pokemonTypes = document.createElement('div');
            pokemonTypes.className = 'pokemon-types';
            pokemonData.types.forEach(pokemonType => {
                const pokemonTypeElement = document.createElement('div');
                pokemonTypeElement.className = 'pokemon-type ' + pokemonType.type.name;
                pokemonTypeElement.innerHTML = pokemonType.type.name;
                pokemonTypes.appendChild(pokemonTypeElement);
            });

            const pokemonImage = document.createElement('img');
            pokemonImage.className = 'pokemon-image';

            const pokemonId = id.toString().padStart(3, '0');
            pokemonImage.srcset = 'https://raw.githubusercontent.com/HybridShivam/Pokemon/master/assets/images/' + pokemonId + '.png';

            const pokemonIdNumber = document.createElement('p');
            pokemonIdNumber.className = 'pokemon-id-number';
            pokemonIdNumber.innerHTML = 'n°' + pokemonId;


            const pokemonphysical = document.createElement('div');
            pokemonphysical.className = 'pokemon-physical';

            const pokemonWeight = document.createElement('p');
            pokemonWeight.className = 'pokemon-weight';
            pokemonWeight.innerHTML = 'Weight: ' + pokemonData.weight + ' kg';

            const pokemonHeight = document.createElement('p');
            pokemonHeight.className = 'pokemon-height';
            pokemonHeight.innerHTML = 'Height: ' + pokemonData.height + ' m';

            const pokemonBaseExperience = document.createElement('p');
            pokemonBaseExperience.className = 'pokemon-base-experience';
            pokemonBaseExperience.innerHTML = 'Base Experience: ' + pokemonData.base_experience;

            pokemonphysical.appendChild(pokemonWeight);
            pokemonphysical.appendChild(pokemonHeight);
            pokemonphysical.appendChild(pokemonBaseExperience);

            const pokemonAbilities = document.createElement('div');
            pokemonAbilities.className = 'pokemon-abilities';

            pokemonData.abilities.forEach(ability => {
                const pokemonAbility = document.createElement('div');
                pokemonAbility.className = 'pokemon-ability';
                pokemonAbility.innerHTML = ability.ability.name;
                pokemonAbilities.appendChild(pokemonAbility);
            });


            pokemonDetails.className = 'pokemon-details';
            pokemonDetails.appendChild(pokemonIdNumber);
            pokemonDetails.appendChild(pokemonImage);
            pokemonDetails.appendChild(pokemonName);
            pokemonDetails.appendChild(pokemonTypes);
            pokemonDetails.appendChild(pokemonAbilities)




            const pokemonStats = document.createElement('div');
            pokemonStats.className = 'pokemon-stats';

            pokemonData.stats.forEach(stat => {
                const pokemonStat = document.createElement('div');
                pokemonStat.className = 'pokemon-stat';
                const pokemonStatName = document.createElement('p');
                pokemonStatName.className = 'pokemon-stat-name';
                pokemonStatName.innerHTML = stat.stat.name;
                const pokemonStatValue = document.createElement('p');
                pokemonStatValue.className = 'pokemon-stat-value';
                pokemonStatValue.innerHTML = stat.base_stat;

                //create progress bar with full width
                const pokemonStatProgress = document.createElement('div');
                pokemonStatProgress.className = 'pokemon-stat-progress';
                pokemonStatProgress.style.width = '100%';
                //create progress bar with stat value width
                const pokemonStatProgressValue = document.createElement('div');
                pokemonStatProgressValue.className = 'pokemon-stat-progress-value';
                pokemonStatProgressValue.style.width = stat.base_stat + '%';
                pokemonStatProgress.appendChild(pokemonStatProgressValue);


                pokemonStat.appendChild(pokemonStatName);
                pokemonStat.appendChild(pokemonStatValue);
                pokemonStats.appendChild(pokemonStat);
                pokemonStats.appendChild(pokemonStatProgress);
            });

            

            const pokemonDescription = document.createElement('div');
            pokemonDescription.className = 'pokemon-description';
            //get details description from API
            fetch(`https://pokeapi.co/api/v2/pokemon-species/${id}`)
            .then(response => response.json())
            .then(pokemonSpeciesData => {
                const pokemonDescriptionText = document.createElement('p');
                pokemonDescriptionText.className = 'pokemon-description-text';
                pokemonDescriptionText.innerHTML = pokemonSpeciesData.flavor_text_entries[0].flavor_text;
                //replace all special characters
                pokemonDescriptionText.innerHTML = pokemonDescriptionText.innerHTML.replace(/[\n\f\r]/g, ' ');
                pokemonDescription.appendChild(pokemonDescriptionText);
            })
            .catch(error => console.error('Errore nella richiesta di descrizione del Pokémon:', error));
            
            pokemonStatistics.appendChild(pokemonStats);

            pokemon.appendChild(pokemonDetails);
            pokemon.appendChild(pokemonStatistics);
            pokemon.appendChild(pokemonDescription)

        })
        .catch(error => console.error('Errore nella richiesta di dettagli del Pokémon:', error));
 