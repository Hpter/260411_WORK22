const botonNuevaReceta = document.getElementById('nuevaReceta')
const contenedorReceta = document.getElementById('receta')

const textoBusqueda = document.getElementById('textoBusqueda')
const botonBuscar = document.getElementById('botonBuscar')

const contenedorFavoritas = document.getElementById('Favoritas')
let Favoritas = []

// Cargar favoritas desde localStorage
const Favoritas_guardadas = localStorage.getItem('Favoritas')
if (Favoritas_guardadas) {
    Favoritas = JSON.parse(Favoritas_guardadas)
}

// URL API
const urlRandom = 'https://www.themealdb.com/api/json/v1/1/random.php'

// Mostrar favoritas
function mostrarFavoritas() {
    contenedorFavoritas.innerHTML = ""

    if (Favoritas.length === 0) {
        contenedorFavoritas.innerHTML = "<p>No hay favoritas guardadas</p>"
        return
    }

    Favoritas.forEach((receta) => {
        contenedorFavoritas.innerHTML += `
        <div class="card" style="width: 18rem;">
            <img src="${receta.imagen}" class="card-img-top">
            <div class="card-body">
                <h5 class="card-title">${receta.nombre}</h5>
                <p class="card-text">
                    Categoría: ${receta.categoria}<br>
                    País: ${receta.pais}
                </p>
                <a href="${receta.youtube}" class="btn btn-primary" target="_blank">Ver receta</a>
                <button class="btn btn-danger mt-2" onclick="eliminarFavoritas('${receta.nombre}')">
                    Eliminar
                </button>
            </div>
        </div>`
    })
}

// Guardar favoritas
function guardarFavoritas(nombre, imagen, categoria, pais, youtube) {
    const yaExiste = Favoritas.some((receta) => receta.nombre === nombre)

    if (!yaExiste) {
        Favoritas.push({ nombre, imagen, categoria, pais, youtube })
    }

    localStorage.setItem("Favoritas", JSON.stringify(Favoritas))
    mostrarFavoritas()
}

// Eliminar favoritas
function eliminarFavoritas(nombre) {
    Favoritas = Favoritas.filter((receta) => receta.nombre !== nombre)
    localStorage.setItem("Favoritas", JSON.stringify(Favoritas))
    mostrarFavoritas()
}

// Crear tarjeta reutilizable
function nuevaTarjeta(receta) {
    return `<div class="card" style="width: 18rem;">
        <img src="${receta.strMealThumb}" class="card-img-top">
        <div class="card-body">
            <h5 class="card-title">${receta.strMeal}</h5>
            <p class="card-text">
                Categoría: ${receta.strCategory}<br>
                País: ${receta.strArea}
            </p>
            <a href="${receta.strYoutube}" class="btn btn-primary" target="_blank">Ver receta</a>
            <button class="btn btn-info mt-2" onclick="guardarFavoritas(
                '${receta.strMeal}',
                '${receta.strMealThumb}',
                '${receta.strCategory}',
                '${receta.strArea}',
                '${receta.strYoutube}'
            )">
                Favoritas
            </button>
        </div>
    </div>`
}

// Cargar receta random
function cargarRecetaRandom() {
    fetch(urlRandom)
        .then(respuesta => respuesta.json())
        .then(datos => {
            contenedorReceta.innerHTML = ''
            const receta = datos.meals[0]
            contenedorReceta.innerHTML = nuevaTarjeta(receta)
        })
}

// Buscar recetas
function buscarRecetas(termino) {
    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${termino}`)
        .then(respuesta => respuesta.json())
        .then(datos => {
            contenedorReceta.innerHTML = ""

            if (datos.meals === null) {
                contenedorReceta.innerHTML = "<p class='text-center mt-4'>No se encontraron recetas</p>"
                return
            }

            datos.meals.forEach(receta => {
                contenedorReceta.innerHTML += nuevaTarjeta(receta)
            })
        })
}

// Inicializar
cargarRecetaRandom()
mostrarFavoritas()

botonNuevaReceta.addEventListener('click', cargarRecetaRandom)

botonBuscar.addEventListener('click', () => {
    const termino = textoBusqueda.value
    buscarRecetas(termino)
})