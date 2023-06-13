import jwt from "jsonwebtoken"
import {fileURLToPath} from "url";
import { dirname } from "path";
import bcrypt from "bcrypt";
const PRIVATE_KEY = "CoderKeyQueFuncionaComoUnSecret";
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const port = 8080;
const url = `http://localhost:${port}`


function createHash(password){
    return bcrypt.hashSync(password,bcrypt.genSaltSync(10));
}

function isValidPassword(user,password){
    return bcrypt.compareSync(password,user?.password);
}

function generateToken(user){
    const token = jwt.sign({user},PRIVATE_KEY,{expiresIn:"24h"});
    return token
}

function authToken(req,res,next){
    const authHeader = req.headers.authorization;
    if(!authHeader) return res.status(401).send({error:"Not authenticated"});
    const token = authHeader.split(" ")[1];
    jwt.verify(token,PRIVATE_KEY,(error,credentials)=>{
        if(error) return res.status(403).send({error:"Not authorized"});
        req.user = credentials.user;
        next();
    })
}

export {__dirname, port,url,createHash,isValidPassword,generateToken,authToken};