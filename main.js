const API_URL = "https://pokeapi.co/api/v2";



async function consumirAPI(endpoint) {

    try {

        const respuesta = await fetch(`${API_URL}${endpoint}`);

        const datos = await respuesta.json();

        if (!respuesta.ok) {
            throw new Error("Error al consultar la API.");
        }

        return datos;

    } catch (error) {
        alert(error.message);
    }
}

async function listarPokemon() {
    const pokemon = document.getElementById("name").value.trim();

    if (!pokemon) {
        mostrarError("Ingresa el nombre o id del Pokémon.");
        return;
    }

    const endpoint = `/pokemon/${pokemon}`;
    const datos = await consumirAPI(endpoint);

    if (!datos) {
        mostrarError("No se pudieron obtener los datos del Pokémon.");
        return;
    }

    
    mostrarResultados([datos]);
}

function mostrarResultados(datos) {
    const resultado = document.getElementById("resultado");
    resultado.innerHTML = "";

    if (!Array.isArray(datos) || datos.length === 0) {
        resultado.innerHTML = "<p>No se encontraron Pokémon</p>";
        return;
    }

    for (const p of datos) {
        const nombre = p.name || "Desconocido";
        const id = p.id || "-";
        const img = p.sprites && p.sprites.front_default ? p.sprites.front_default : "";

        // Habilidades
        let habilidades = "";
        if (Array.isArray(p.abilities) && p.abilities.length > 0) {
            const lista = [];
            for (const item of p.abilities) {
                if (item && item.ability && item.ability.name) {
                    lista.push(item.ability.name);
                }
            }
            habilidades = lista.join(", ");
        }

        const div = document.createElement("div");
        div.className = "festivo";
        div.style.borderLeftColor = "#0066cc";

        let contenido = `<p><b>#${id}</b> - ${nombre}</p>`;

        if (img) {
            contenido += `<img src="${img}" alt="${nombre}" style="width:96px; height:96px; object-fit:contain;" />`;
        }

        if (habilidades) {
            contenido += `<p><b>Habilidades:</b> ${habilidades}</p>`;
        }

        div.innerHTML = contenido;
        resultado.appendChild(div);
    }
}

function mostrarError(mensaje) {
    const resultado = document.getElementById("resultado");
    resultado.innerHTML = `<p class="error">${mensaje}</p>`;
}


async function verificarHabilidad() {
    const habilidad = document.getElementById("ability").value.trim();

    if (!habilidad) {
        mostrarError("Ingresa una habilidad.");
        return;
    }

    
    const datos = await consumirAPI(`/ability/${habilidad}`);

    if (!datos || !Array.isArray(datos.pokemon) || datos.pokemon.length === 0) {
        mostrarError("No hay Pokémon con esa habilidad.");
        return;
    }

    
    const resultado = document.getElementById("resultado");
    resultado.innerHTML = "";

    const max = Math.min(12, datos.pokemon.length);
    for (let i = 0; i < max; i++) {
        const nombre = datos.pokemon[i]?.pokemon?.name || "Desconocido";

        const div = document.createElement("div");
        div.className = "festivo";
        div.style.borderLeftColor = "#0066cc";
        div.innerHTML = `<p><b>${nombre}</b></p>`;
        resultado.appendChild(div);
    }
}


async function verificarGeneracion() {
    const gen = document.getElementById("generation").value.trim();

    if (!gen) {
        mostrarError("Ingresa una generación (número o nombre)." );
        return;
    }

   
    const datos = await consumirAPI(`/generation/${gen}`);

    if (!datos || !Array.isArray(datos.pokemon_species) || datos.pokemon_species.length === 0) {
        mostrarError("No hay Pokémon para esa generación.");
        return;
    }

    
    const resultado = document.getElementById("resultado");
    resultado.innerHTML = "";

    const max = Math.min(12, datos.pokemon_species.length);
    for (let i = 0; i < max; i++) {
        const nombre = datos.pokemon_species[i]?.name || "Desconocido";

        const div = document.createElement("div");
        div.className = "festivo";
        div.style.borderLeftColor = "#0066cc";
        div.innerHTML = `<p><b>${nombre}</b></p>`;
        resultado.appendChild(div);
    }
}
