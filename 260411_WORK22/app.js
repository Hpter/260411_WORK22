const contenedor = document.getElementById("peliculas")

const url = "https://ghibliapi.vercel.app/films"

// Crear tarjeta
function crearTarjeta(pelicula) {
    return `
    <div class="card m-3" style="width: 18rem;">
        <img src="${pelicula.image}" class="card-img-top">
        <div class="card-body">
            <h5 class="card-title">${pelicula.title}</h5>
            <p class="card-text">
                Director: ${pelicula.director} <br>
                Año: ${pelicula.release_date} <br>
                Puntuación: ${pelicula.rt_score}
            </p>
        </div>
    </div>
    `
}

// Cargar películas
function cargarPeliculas() {
    fetch(url)
        .then(respuesta => respuesta.json())
        .then(datos => {
            contenedor.innerHTML = ""

            datos.forEach(pelicula => { 
                contenedor.innerHTML += crearTarjeta(pelicula)
            })
        })
}

cargarPeliculas()