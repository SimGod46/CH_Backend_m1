import express from 'express'
import {fork} from "child_process"

const app = express()

app.get("/",(req,res)=>{
    const child = fork("./src/operacionCompleja");
    child.send("Inicia el calculo") // Este el el message?
    child.on("message",result=>{
        res.json({message: result});
    })
})

app.get("/test",(req,res)=>{
        res.json({message: "Tarea secundaria"});
})

app.listen(3000,()=>{
    console.log("3000")
})