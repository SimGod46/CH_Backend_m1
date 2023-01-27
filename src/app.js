import express from 'express'
import handlebars from "express-handlebars"
import routes from "./routes/index.js"
import __dirname from './utils.js';
import { Server } from 'socket.io';

const port = 8080;
const app = express();

app.engine("handlebars",handlebars.engine());
app.set("views",__dirname + "/views");
app.set("view engine","handlebars");


app.use(express.static(__dirname+"/public"));
//app.use(express.static(__dirname+"/views"));
app.use(express.urlencoded({extended:true}));
app.use(express.json());

routes(app);
const httpServer = app.listen(port,()=>console.log("Running from express"));
const socketServer = new Server(httpServer);
socketServer.on("connection",socket=>{
    console.log("Nuevo cliente conectado");
    socket.on("productsUpdated",data=>{
        console.log("ENVIANDO",data);
        socketServer.emit("productsList",data)
    })
    //socket.emit("productsList",[{"title":"titulo1"},{"title":"titulo2"}]);
});