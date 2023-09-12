// Responsabilidad: Configuración de la aplicación
import express from 'express'
import handlebars from "express-handlebars"
import routes from "./routes/index.js"
import {__dirname} from './utils.js';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import passport from 'passport';
import initializePassport from "./config/passport.config.js"
import { dbConnect, sessionStorage } from '../db/index.js';
import { persistance } from "./config/app.config.js";

//import cors from "cors";
// app.use(cors()); // se puede conectar desde cualquier otro servidor
// app.use(cors({"http://localhost:9000"})); // se puede conectar desde cualquier otro servidor

const app = express();

app.engine("handlebars",handlebars.engine());
app.set("views",__dirname + "/views");
app.set("view engine","handlebars");

app.use(express.static(__dirname+"/public"));
app.use(cookieParser("3n35Kn5%nihA"));

app.use(express.urlencoded({extended:true}));
app.use(express.json());

app.use(session({
    store: sessionStorage,//new fileStorage({path:"./sessions",ttl:100,retries:0}),
    secret:"secretCoder",
    resave:false,
    saveUninitialized:false
}));

initializePassport();
app.use(passport.initialize());
app.use(passport.session());

if(persistance === "MONGO") dbConnect();
routes(app);

export { app };