import express from 'express'
import handlebars from "express-handlebars"
import routes from "./routes/index.js"
import __dirname from './utils.js';
import { Server } from 'socket.io';
import mongoose, { mongo } from 'mongoose';
import cookieParser from 'cookie-parser';
import session from 'express-session';

const port = 8080;
const app = express();

app.engine("handlebars",handlebars.engine());
app.set("views",__dirname + "/views");
app.set("view engine","handlebars");


app.use(express.static(__dirname+"/public"));
app.use(cookieParser());
app.use(cookieParser("3n35Kn5%nihA"));

app.use(express.urlencoded({extended:true}));
app.use(express.json());

app.use(session({
    secret:"secretCoder",
    resave:true,
    saveUninitialized:true
}));

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
mongoose.connect("mongodb+srv://simonarias12:<password>@codercluster.miyask0.mongodb.net/?retryWrites=true&w=majority",(error)=>{
    if(error){
        console.log("Error al conectarse a la base de datos: "+error);
        process.exit();
    }
})