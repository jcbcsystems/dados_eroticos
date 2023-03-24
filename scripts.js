const inputNombre = document.getElementById('nombre')
const selectGenero = document.getElementById('genero')
const btnAddJugador = document.getElementById('btn-add-jugador')
const contenedorJugadores = document.getElementById('contenedorJugadores')
const btnIniciar = document.getElementById('btn-iniciar')

const sectionAgregarJugadores = document.getElementById('agregar-jugador')
const sectionJuego = document.getElementById('juego')

const contenedorQuienEjecuta = document.getElementById('contenedorQuienEjecuta')
const contenedorAQuienEjecuta = document.getElementById('contenedorAQuienEjecuta')
const btnIniciarDados = document.getElementById('btn-iniciar-dados')
const seccionAccion = document.getElementById('accion')
const seccionLugar = document.getElementById('lugar')
const btnSiguienteTurno = document.getElementById('btn-siguiente-turno')

let jugadores = []
let jugador
let jugadorTurno
let jugadorTurnoContrario

let dados = [
    {
        accion: "Besar",
        lugares: [
            "Boca",
            "Senos/Tetillas",
            "Espalda",
            "Nalgas",
            "Entre piernas",
            "Epalda baja",
        ]
    },
    {
        accion: "Chupar",
        lugares: [
            "Labios",
            "Senos/Tetillas",
            "Vulva/Pene"
        ]
    },
    {
        accion: "Acariciar",
        lugares: [
            "Labios",
            "Senos/Tetillas",
            "Cuello",
            "Espalda",
            "Hombros",
            "Espalda baja",
            "Muslos",
            "Entre Piernas",
            "Pies",
            "Nalgas",
        ]
    },
    {
        accion: "Masajear",
        lugares: [
            "Hombros",
            "Espalda",
            "Entre piernas",
            "Nalgas",
            "Muslos",
        ]
    },
    {
        accion: "Lamer",
        lugares: [
            "Labios",
            "Clitoris/Cabecita",
            "Pomulo de orejas",
            "Senos/Tetillas",
            "Nalgas",
        ]
    },
    {
        accion: "Muerde",
        lugares: [
            "Labios",
            "Clitoris/Cabecita",
            "Pomulo de orejas",
            "Senos/Tetillas",
            "Entre piernas",
            "Dedo de mano",
            "Nalgas",
        ]
    },
    {
        accion: "Apretar",
        lugares: [
            "Senos/Pecho",
            "Entre piernas",
            "Nalgas",
            "Cintura",
        ]
    },
    {
        accion: "Palmadas",
        lugares: [
            "Imaginación"
        ]
    },
    {
        accion: "Masturbar",
        lugares: [
            "Al contrario"
        ]
    },
]

function iniciar() { 
    btnAddJugador.addEventListener('click', addJugador)
    btnIniciar.addEventListener('click', iniciarJuego)
    btnIniciarDados.addEventListener('click', iniciarDados)
    btnSiguienteTurno.addEventListener('click', iniciarJuego)
    btnIniciar.style.display = 'none'
    sectionJuego.style.display = 'none'
}

function addJugador() {
    var nombre = inputNombre.value
    var genero = selectGenero.value
    
    jugadores.push({
        nombre: nombre,
        genero: genero
    })

    jugador = `<p> ${nombre} - ${genero} </P>`
    contenedorJugadores.innerHTML += jugador

    inputNombre.value = ''
    selectGenero.value = 'F'

    if(jugadores.length > 1) {
        btnIniciar.style.display = 'block'
    }
}

function iniciarJuego(){
    sectionAgregarJugadores.style.display = 'none'
    sectionJuego.style.display = 'flex'
    seccionAccion.style.display = 'none'
    seccionLugar.style.display = 'none'
    btnSiguienteTurno.style.display = 'none'
    btnIniciarDados.style.display = 'block'

    let turno = aleatorio(0, jugadores.length - 1)
    
    jugadorTurno = jugadores[turno]
        
    let jugadoresGeneroContrario = jugadores.filter((jugador) => jugador.genero !== jugadorTurno.genero)
    turno = aleatorio(0, jugadoresGeneroContrario.length - 1)

    jugadorTurnoContrario = jugadoresGeneroContrario[turno]
    
    jugador = `<h2 class="subtitulo-turno">El turno le toca a:</h2> <p> ${jugadorTurno.nombre} - ${jugadorTurno.genero} </P>`
    
    jugador = `<p> <strong> ${jugadorTurno.nombre} </strong> Ejecuta A <strong>${jugadorTurnoContrario.nombre}</strong></P>`
    contenedorQuienEjecuta.innerHTML = jugador

    //jugador = `<h2 class="subtitulo-turno">A quien debe ejecutar la accion :</h2> <p> ${jugadorTurnoContrario.nombre} - ${jugadorTurnoContrario.genero} </P>`
    //contenedorAQuienEjecuta.innerHTML = jugador
}

function iniciarDados() {
    seccionAccion.style.display = 'flex'
    seccionLugar.style.display = 'flex'
    btnIniciarDados.style.display = 'none'
    btnSiguienteTurno.style.display = 'block'

    let turnoAccion = aleatorio(0, dados.length - 1)
    let dado = dados[turnoAccion]
    let turnoLugar = aleatorio(0, dado.lugares.length - 1)
    let lugar = dado.lugares[turnoLugar]    
    
    seccionAccion.innerHTML = dado.accion
    seccionLugar.innerHTML = lugar
}


function aleatorio(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
}

window.addEventListener('load', iniciar)