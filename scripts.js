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

const STEP = 10;

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
            "Clitoris/Pene",
            "Cuello"
        ]
    },
    {
        accion: "Chupar",
        lugares: [
            "Labios",
            "Senos/Tetillas",
            "Vulva/Pene",
            "Cuello"
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
            "Clitoris/Pene",
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
            "Cuello"
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
            "Cuello"
        ]
    },
    {
        accion: "Muerde",
        lugares: [
            "Labios",
            "Clitoris/Cabecita",
            "Lobulo de orejas",
            "Senos/Tetillas",
            "Entre piernas",
            "Dedo de mano",
            "Nalgas",
            "Cuello"
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
            "Al contrario",
            "Vagina/Pene"
        ]
    },
]

function iniciar() { 
    btnAddJugador.addEventListener('click', addJugador)
    btnIniciar.addEventListener('click', iniciarJuego)
    btnIniciarDados.addEventListener('click', iniciarDados)
    btnSiguienteTurno.addEventListener('click', iniciarJuego)
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
    
    jugador = `<p> <strong> ${jugadorTurno.nombre} </strong> Ejecuta A <strong>${jugadorTurnoContrario.nombre}</strong></P>`
    contenedorQuienEjecuta.innerHTML = jugador
}

async function iniciarDados() {
    seccionAccion.style.display = 'flex'
    btnIniciarDados.style.display = 'none'
    btnSiguienteTurno.style.display = 'block'

    seccionAccion.innerHTML = ''
    seccionLugar.innerHTML = ''

    let turnoAccion = aleatorio(0, dados.length - 1)
    let dado = dados[turnoAccion]
    let turnoLugar = aleatorio(0, dado.lugares.length - 1)
    let lugar = dado.lugares[turnoLugar]
    
    var targetAngle = 0
    
    while(targetAngle <= 360){
        changeRotate(seccionAccion, targetAngle)        
        await timer(10);
        targetAngle += STEP
    }    
    seccionAccion.innerHTML = dado.accion

    seccionLugar.style.display = 'flex'

    targetAngle = 0
    
    while(targetAngle <= 360){
        changeRotate(seccionLugar, targetAngle)        
        await timer(10);
        targetAngle += STEP
    }
    
    seccionLugar.innerHTML = lugar
}


function aleatorio(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
}

function changeRotate(item, val)
{
    item.style.transform = "rotate(" + val + "deg)";
    item.style.webkitTransform = "rotate(" + val + "deg)";
    item.style.mozTransform = "rotate(" + val + "deg)";
}

const timer = ms => new Promise(res => setTimeout(res, ms))

window.addEventListener('load', iniciar)