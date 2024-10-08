//DESARROLLA AQUI TUS SOLUCIONES
// 1.- Declara una función getRandomPokemon que retorne un pokemon aleatorio.

async function getRandomPokemon() {
    try {
        let response = await fetch(`https://pokeapi.co/api/v2/pokemon/${Math.floor(Math.random() * 177)}`)

        if (!response.ok) {
            throw new Error(`Error HTTP: ${response.status} - ${response.statusText}`);
        }

        let data = await response.json();

        return data;
    } catch (error) {
        // Manejar errores de red o del servidor
        console.error('Hubo un problema con la solicitud:', error.message);
    }

}

// async function getRandomPokemon(){
//     let response = await fetch(`https://pokeapi.co/api/v2/pokemon`)
//     let data = await response.json();
//     let n = Math.floor(Math.random() * (data.results).length);
//     // Aplicar el nº random al índice del array de results

//     console.log(data.results[n])
// }



// 2.- Declara una funcion getImageAndName que retorne el nombre y la URL de la imagen de un pokemon => (return {img, name})
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


    } catch (error) {
        // Manejar errores de red o del servidor
        console.error('Hubo un problema con la solicitud:', error.message);
    }
}

// 3.- Declara una funcion printImageAndName que retorne el string necesario para pintar la imagen y el nombre del pokemon en el DOM de la siguiente forma:
async function printImageAndName() {
    try {
        let data = await getImageAndName();
        // Aquí no ponemos if(!response.ok) porque ya viene de la otra función donde se ha hecho
        return ` 
        <section>
            <img src="${data.img}" alt="Imagen de ${data.name}">
            <h1>${data.name}</h1>
        </section>`
    } catch (error) {
        // Manejar errores de red o del servidor
        console.error('Hubo un problema con la solicitud:', error.message);
    }


    // document.body.innerHTML +=
    // `<section>
    //     <img src="url de imagen" alt="nombre del pokemon">
    //     <h1>Nombre del pokemon</h1>
    // </section>`;

}

// 4.- Declara una función getRandomDogImage que retorne la url de la imagen de un perro aleatorio

async function getRandomDogImage() {
    try {
        let response = await fetch("https://dog.ceo/api/breeds/image/random");

        if (!response.ok) {
            throw new Error(`Error HTTP: ${response.status} - ${response.statusText}`);
        }

        let data = await response.json();
        return data.message;

    } catch (error) {
        // Manejar errores de red o del servidor
        console.error('Hubo un problema con la solicitud:', error.message);
    }
}

// 5.- Declara una función getRandomPokemonImage que retorne la url de la imagen de un pokemon aleatorio.
async function getRandomPokemonImage() {
    try {
        let response = getRandomPokemon();
        let data = await response;
        return data.sprites.front_default;
    } catch (error) {
        // Manejar errores de red o del servidor
        console.error('Hubo un problema con la solicitud:', error.message);
    }
    
 
}

// 6.- Declara una función printPugVsPikachu que pinte la batalla entre "Pug" y "Pikachu" (no se testea)
async function printPugVsPikachu() {
    try {
        let pug = await fetch("https://dog.ceo/api/breed/pug/images/random");

        if (!pug.ok) {
            throw new Error(`Error HTTP: ${pug.status} - ${pug.statusText}`);
        }
        
        let pikachu = await getImageAndName();

        let dataPug = await pug.json();

        let arrayUrls = [dataPug.message, "https://www.freepnglogos.com/uploads/vs-png/vs-fire-icon-png-logo-Image-10.png", pikachu.img];

        let divBatalla = document.querySelector("#batalla");

        // Recorrer el array, crear "img" en HTML y meter el src de cada una
        for(let i = 0; i < arrayUrls.length; i++){
            let img = document.createElement("img");
            img.src = arrayUrls[i];
            divBatalla.appendChild(img);
        }

        let ganador = document.querySelector("#ganador");
        let random = Math.floor(Math.random() * 2)

        random === 1 
            ? ganador.textContent = "GANA EL PUG"
            : ganador.textContent = "GANA PIKACHU"

        // Figure

    } catch (error) {
        // Manejar errores de red o del servidor
        console.error('Hubo un problema con la solicitud:', error.message);
    }
}
printPugVsPikachu()

// 7.- Declara una función getRandomCharacter que retorne un personaje aleatorio.

async function getRandomCharacter(){
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

async function getRandomCharacterInfo(){
    try{
        let response = await getRandomCharacter();
        
        let img = response.image;
        let name = response.name;
        let episodes = response.episode;
        let firstEpisode = episodes[0]; // https://rickandmortyapi.com/api/episode/1


        // Ir a la API a buscar fecha del último episodio
        let response2 = await fetch(firstEpisode);
        
        if (!response2.ok) {
            throw new Error(`Error HTTP: ${response2.status} - ${response2.statusText}`);
        }

        let data = await response2.json();

        let dateEpisode = data.air_date;
        console.log(
            `img: ${img}
            name: ${name}
            episodes: ${episodes}
            firstEpisode: ${firstEpisode}
            dateEpisode: ${dateEpisode}
            `)
        return {img, name, episodes, firstEpisode, dateEpisode};

    } catch (error) {
        // Manejar errores de red o del servidor
        console.error('Hubo un problema con la solicitud:', error.message);
    }
    
}
// para pintar los datos del personaje en el DOM
function displayCharacterInfo(data) {
    const characterInfoDiv = document.getElementById('character-info');
    characterInfoDiv.innerHTML = `
      <img src="${data.img}" alt="${data.name}" />
      <div>
        <h2>${data.name}</h2>
        <p><strong>Episodios en los que aparece:</strong> ${data.episodes}</p>
        <p><strong>Primer episodio:</strong> ${data.firstEpisode}</p>
        <p><strong>Fecha en el que aparece:</strong> ${data.dateEpisode}</p>
      </div>
    `;
}

// botón 
document.getElementById('fetch-character').addEventListener('click', async () => {
    const characterData = await getRandomCharacterInfo();
    if (characterData) {
        displayCharacterInfo(characterData);  // Pintar los datos en el DOM
    }
});