import express from 'express'
import handlebars from "express-handlebars"
import routes from "./routes/index.js"
import {__dirname,port,mongoDB} from './utils.js';
import { Server } from 'socket.io';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import FileStore from 'session-file-store';
import {productos} from "./products/productsManager.js"

const fileStorage = FileStore(session);
const app = express();

app.engine("handlebars",handlebars.engine());
app.set("views",__dirname + "/views");
app.set("view engine","handlebars");

app.use(express.static(__dirname+"/public"));
app.use(cookieParser("3n35Kn5%nihA"));

app.use(express.urlencoded({extended:true}));
app.use(express.json());

app.use(session({
    store: new fileStorage({path:"./sessions",ttl:100,retries:0}),
    secret:"secretCoder",
    resave:true,
    saveUninitialized:true
}));

mongoose.set("strictQuery",false);
mongoose.connect(mongoDB,(error)=>{
    if(error){
        console.log("Error al conectarse a la base de datos: "+error);
        process.exit();
    }
})

routes(app);const httpServer = app.listen(port,()=>console.log("Running from express"));

const io = new Server(httpServer);
io.on("connection",socket=>{
    console.log("Nuevo socket conectado: "+socket.id+" "+socket.handshake.address);
    socket.on("realtimeRequest",data=>{
        socket.emit("productsList",productos.getProducts(10,true))
    
    })
});


export {io};