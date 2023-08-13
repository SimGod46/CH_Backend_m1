import { Router } from "express";
import { Usuario } from "../DAO/mongo/models/users.model.js";
import { createHash, generateToken } from "../utils.js";
import passport from "passport";

const router = Router();

function auth(req,res,next){
    if(req.session?.role==="admin"){
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

router.post("/restore",async (req,res)=>{
    const {username, password} = req.body;
    const usuario = await Usuario.findOne({ email: username})
    if (!usuario){
        return res.send("Usuario no valido");
    } else {
        await Usuario.updateOne({email:username},{password:createHash(password)});
        res.send("Actualizado correctamente");
    }   

})

router.post("/login",passport.authenticate("login",{failureRedirect:"/api/sessions/failureLogin"}),async (req,res)=>{
    if(!req.user) return res.send("El usuario y la contraseña no coinciden");
    
    req.session.user = {
        email:req.user.email,
        first_name: req.user.first_name,
        last_name: req.user.last_name,
        age: req.user.age
    } ;
    if(req.user.email==="adminCoder@coder.com"){
        req.session.role = "admin";
    } else {
        req.session.role = "user";
    }
    const access_token = generateToken(req.session.user);

    res.redirect("/realtimeproducts");
})

router.get("/failureLogin",(req,res)=>{
    res.send("Error al ingresar");
})

router.post("/register",passport.authenticate("register",{failureRedirect:"/api/sessions/failureRegister"}), async (req,res)=>{
    res.send("Usuario guardado exitosamente!");
})

router.get("/failureRegister",(req,res)=>{
    res.send("Error al registrarse");
})

router.post("/github",passport.authenticate("github",{scope:["user:email"]}), async (req,res)=>{
})

router.post("/githubcallback",passport.authenticate("github",{failureRedirect:"/api/sessions/login"}), async (req,res)=>{
    req.session.user= req.user;
    res.redirect("/");
})

router.get("/privado",auth,(req,res)=>{
    res.send("Contenido visible solo para el admin");
})

export default router;