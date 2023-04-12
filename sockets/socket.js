
const {io} =require("../index");
const Bands = require("../models/bands");
const Band = require("../models/band");

const bands=new Bands();

bands.addBand(new Band("Queen"));
bands.addBand(new Band("Linkin park"));
bands.addBand(new Band("Rise against"));
bands.addBand(new Band("Against the current"));
bands.addBand(new Band("Imagine dragons"));


//Mensajes de sockets
io.on('connection', client => {
    console.log("Cliente conectado")

    client.emit("bandas-activas", bands.getBands());

    client.on('disconnect', () => { 
        console.log("Cliente desconectado")
    });
    //on es para escuchar, emit es para mandar.
    //En index.html estoy mandando con emit un mensaje "mensaje", que aca lo escucho
    client.on("mensaje",(payload)=>{
         console.log(payload);
         io.emit("mensaje", {admin: "Nuevo mensaje"})
    });
    //Desde el navegador, en al consola pongo socket.emit("emitir-mensaje","Fran"), es decir,
    //desde el cliente navegador, emito el mensaje, que lo escuchan todos los clientes
    //con este metodo, y luego emito el mensaje "nuevo-mensaje" a todos los clientes.
    //Luego, en SocketProvider, en la app flutter, escucho este "nuevo-mensaje" e imprime
    //el payload.
    client.on("emitir-mensaje",(payload)=>{
        //console.log(payload);
        //io.emit("nuevo-mensaje", payload); //Emite a TODOS los clientes, inclusive el que mando el mensaje
        client.broadcast.emit("emitir-mensaje", payload); //Se lo emite a todos menos a si mismo.
    })
    client.on("votacion-banda",(bandId)=>{
        bands.voteBand(bandId);
        io.emit("bandas-activas", bands.getBands());
    })
    client.on("nueva-banda",(bandName)=>{
        //bandName es un map con la key name. 
        //En realidad es un objeto de js, asi que bandName.name es valido
        //El evento nueva-banda es emitido en home page de flutter.
        bands.addBand(new Band(bandName["name"]));
        io.emit("bandas-activas", bands.getBands());
    })
    client.on("banda-eliminada",(bandId)=>{
        bands.deleteBand(bandId);
        io.emit("bandas-activas", bands.getBands());
    })
});