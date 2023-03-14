import { Router } from "express";
import { Usuario } from "../../models/users.model.js";
import { createHash, isValidPassword } from "../../utils.js";
const router = Router();

function auth(req,res,next){
    if(req.session?.role=="admin"){
        return next()
    }
    return res.status(401).send("Error de autorización")
}

router.post("/setCookie", async (req,res)=>{
    res.cookie("CoderCookie","esta es una cookie",{maxAge:10000, signed:true}).send("Cookie");
});

router.get("/getCookies", async (req,res)=>{
    res.send(req.signedCookies);
});

router.delete("/deleteCookie", async (req,res)=>{
    res.clearCookie("CoderCookie").send("Cookie Removed");
});


router.get("/logout", async (req,res)=>{
    req.session.destroy(err=>{
        if(!err) res.redirect("/ingresar");
        else res.send({status:"Logout error",body:err})
    })
});

router.post("/login",async (req,res)=>{
    const {username, password} = req.body;
    const usuario = await Usuario.findOne({ email: username})
    if (!usuario || !isValidPassword(usuario,password)){
        req.session.role ="user";
        req.session.user = null;
        return res.send("El usuario y la contraseña no coinciden");
    }
    req.session.user = {
        email:usuario.email,
        first_name: usuario.first_name,
        last_name: usuario.last_name,
        age: usuario.age
    } ;
    if(usuario.email=="adminCoder@coder.com"){
        req.session.role = "admin";
    }
    res.redirect("/realtimeproducts");
})

router.post("/register",async (req,res)=>{
    const {first_name,last_name,email,age,password} = req.body;
    const usuario = new Usuario({
        first_name: first_name,
        last_name: last_name,
        email: email,
        age: age,
        password:createHash(password) 
    });

    await usuario.save();
    res.send("Usuario guardado exitosamente!");
})

router.get("/privado",auth,(req,res)=>{
    res.send("Contenido visible solo para el admin");
})

export default router;