import { Router } from "express";
const router = Router();

function privateAccess(req,res,next){
    if(!req.session.user){
        res.redirect("/ingresar");
    }
    next()

}

function publicAccess(req,res,next){
    if(req.session.user){
        res.redirect("/perfil");
    }
    next()
}

router.get("/",(req,res)=>{
    if(req.session.counter){
        req.session.counter++;
    } else {
        req.session.counter = 1;
    }
    res.render("welcome.handlebars",{conteo: req.session.counter, nombre: req.session.user?.first_name});
});

router.get("/ingresar",publicAccess, async (req,res)=>{
    res.render("loginScreen.handlebars")
});

router.get("/registrar",publicAccess, async (req,res)=>{
    res.render("registerScreen.handlebars")
});

router.get("/perfil",privateAccess ,async (req,res)=>{
    res.render("profileScreen.handlebars",req.session.user)
});

router.get("/restorePassword" , (req,res)=>{
    res.render("restorePassword.handlebars")
});

export default router;