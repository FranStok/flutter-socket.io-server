

const {io} =require("../index")

//Mensajes de sockets
io.on('connection', client => {
    console.log("Cliente conectado")
    client.on('disconnect', () => { 
        console.log("Cliente desconectado")
    });
    //on es para escuchar, emit es para mandar.
    //En index.html estoy mandando con emit un mensaje "mensaje", que aca lo escucho
    client.on("mensaje",(payload)=>{
        console.log("Mensaje!! ", payload);
        io.emit("mensaje", {admin: "Nuevo mensaje"})
    });

});