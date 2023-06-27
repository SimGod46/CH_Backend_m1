// Responsabilidad: Levantar servidor
import { port } from "./config/app.config.js";
import { app } from "./app.js";
import { Server } from 'socket.io';
import {getProducts} from "./service/products.service.js"

const httpServer = app.listen(port,()=>console.log(`Running from express on port:${port}`));
const io = new Server(httpServer);
io.on("connection",socket=>{
    console.log("Nuevo socket conectado: "+socket.id+" "+socket.handshake.address);
    socket.on("realtimeRequest",data=>{
        socket.emit("productsList",getProducts(10,true))
    
    })
});
export { io };
