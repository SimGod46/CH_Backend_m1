import { Command } from 'commander'; 
import dotenv from "dotenv";
const command = new Command();
command
.option("-d, --debug","Variable para debugging",false) //ESTOS SON LOS VALORES POR DEFECTO
.option("-p <port>", "Puerto del servidor",8080)
.option("-m, --mode <modo>", "Enviroment a utilizar","development")
.parse();
// console.log(command.opts()) // Mostrar el valor de los parametros
// console.log(command.opts().token)

const environment = command.opts().mode// Otra forma: proccess.env.NODE_ENV
dotenv.config({
    path: `./.env.${environment}`
        //Otra forma: environment === "DEVELOPMENT" ? "./.env.development" : "./.env.production"
});
export const {port = process.env.port} = {};