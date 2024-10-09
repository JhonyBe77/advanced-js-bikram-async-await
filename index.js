//DESARROLLA AQUI TUS SOLUCIONES
//DESARROLLA AQUI TUS SOLUCIONES
//1
/* async function getRandomPokemon (pokemon){
    let response = await fetch(`https://pokeapi.co/api/v2/pokemon/`)
    let data = await response.json();
    let n = Math.floor(Math.random() * (data.results).leght)
    return data.results[n]
} */

async function getRandomPokemon() {
    try {
        let response = await fetch(`https://pokeapi.co/api/v2/pokemon/${Math.floor(Math.random() * 177)}`)
        if (!response.ok) {
            throw new Error(`Error HTTP: ${response.status} - ${response.statusText}`);
        }

        let data = await response.json();
        return data
    } catch (error) {
        console.log(`ERROR: ${error.stack}`);
    }
}

//2

async function getImageAndName() {
    try {
        let response = await fetch(`https://pokeapi.co/api/v2/pokemon/pikachu`)
        if (!response.ok) {
            throw new Error(`Error HTTP: ${response.status} - ${response.statusText}`);
        }
        let data = await response.json();
        let name = data.name;
        let img = data.sprites.front_default;
        return { name, img }
    }
    catch (error) {
        console.log(`ERROR: ${error.stack}`);
    }
}

//3

async function printImageAndName() {
    try {
        let data = await getImageAndName();
        return `<section>
                    <img src="${data.img}"
                    alt="nombre del pokemon ${data.name}">
                    <h1>${data.name}</h1>
                </section>`
    }
    catch (error) {
        console.log(`ERROR: ${error.stack}`);

    }
}

//4

async function getRandomDogImage() {
    try {
        let response = await fetch(`https://dog.ceo/api/breeds/image/random`);
        if (!response.ok) {
            throw new Error(`Error HTTP: ${response.status} - ${response.statusText}`);
        }
        let data = await response.json();
        return data.message;
    }
    catch (error) {
        console.log(`ERROR: ${error.stack}`);
    }
}

//5

async function getRandomPokemonImage() {
    try {
        let response = getRandomPokemon();
        let data = await response;
        return data.sprites.front_default;
    }
    catch (error) {
        console.log(`ERROR: ${error.stack}`);
    }
}
//6

async function printPugVsPikachu() {
    try {
        let pug = await fetch(`https://dog.ceo/api/breed/pug/images/random`);
        let pikachu = await getImageAndName();
        let dataPug = await pug.json();
        /*let urlPug = dataPug.message;
        let urlPikachu = pikachu.img
        let urVs = "https://www.freepnglogos.com/uploads/vs-png/vs-fire-icon-png-logo-Image-10.png"
        */
        let divBatalla = document.querySelector("#batalla");
        let arrayUrl = [dataPug.message, "https://www.freepnglogos.com/uploads/vs-png/vs-fire-icon-png-logo-Image-10.png", pikachu.img]
        for (let i = 0; i < arrayUrl.length; i++) {

            let img = document.createElement("img");
            img.src = arrayUrl[i];
            divBatalla.appendChild(img);
        }
        let ganador = document.querySelector("#ganador")
        let random = Math.floor(Math.random() * 2);
        random === 1
            ? ganador.textContent = "GANA EL PUG"
            : ganador.textContent = "GANA EL PIKACHU"
    } catch (error) {
        console.log(`ERROR: ${error.stack}`)

    }
}
printPugVsPikachu()


// 7.- Declara una función getRandomCharacter que retorne un personaje aleatorio.

async function getRandomCharacter() {
    try {
        let response = await fetch("https://rickandmortyapi.com/api/character")

        if (!response.ok) {
            throw new Error(`Error HTTP: ${response.status} - ${response.statusText}`);
        }

        let data = await response.json();

        // Devuelve un objeto, donde la llave "results" tiene un array de objetos con los personajes
        let numRandom = Math.floor(Math.random() * 20);

        return data.results[numRandom];
    } catch (error) {
        // Manejar errores de red o del servidor
        console.error('Hubo un problema con la solicitud:', error.message);
    }
}

//  8.- Declara una función getRandomCharacterInfo que retorne de un personaje su imagen, nombre, episodios en los que aparece y el nombre del primer episodio en el que aparece + fecha de estreno, tendrás que hacer otro fetch para llegar a los ultimos datos. Formato de retorno => (return {img, name, episodes, firstEpisode, dateEpisode})

async function fungetRandomCharacterInfo() {
    try {
        // Reutilizar la función anterior
        let character = await getRandomCharacter();


        let firstEpisodeUrl = character.episode[0];
        let firstEpisodeResponse = await fetch(firstEpisodeUrl);

        if (!firstEpisodeResponse.ok) {
            throw new Error(`Error HTTP: ${firstEpisodeResponse.status} - ${firstEpisodeResponse.statusText}`);
        }

        let firstEpisode = await firstEpisodeResponse.json();
        return {
            img: character.image,
            nombre: character.name,
            episodios: character.episode.length,
            primerEpisodio: firstEpisode.name,
            fechaEpisodio: firstEpisode.air_date
        };

    } catch (error) {
        console.log(`ERROR: ${error.stack}`);
    }
}

// datos del personaje en el DOM
function displayCharacterInfo(data) {
    const characterInfoDiv = document.getElementById('character-info');
    characterInfoDiv.innerHTML = `
      <img src="${data.img}" alt="${data.nombre}" />
      <div>
        <h2>${data.nombre}</h2>
        <p><strong>Episodios en los que aparecen:</strong> ${data.episodios}</p>
        <p><strong>Primer episodio :</strong> ${data.primerEpisodio}</p>
        <p><strong>Fecha en el que aparece:</strong> ${data.fechaEpisodio}</p>
      </div>
    `;
}

// Asignar evento al botón para obtener y mostrar los datos
document.getElementById('fetch-character').addEventListener('click', async () => {
    const characterData = await fungetRandomCharacterInfo();
    if (characterData) {
        displayCharacterInfo(characterData);
    }
});



