import { Router } from "express";
const router = Router();

function auth(req,res,next){
    if(req.session?.user === "admin" && req.session?.admin){
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


router.post("/logout", async (req,res)=>{
    req.session.destroy(err=>{
        if(!err) res.send("Logout ok")
        else res.send({status:"Logout error",body:err})
    })
});

router.post("/login",(req,res)=>{
    const {username, password} = req.body
    if(username !== "admin" || password !== "123"){
        req.session.admin = false;
        return res.send("Login failed")
    }
    req.session.user = username;
    req.session.admin = true;
    res.send("login success!");
})

router.get("/privado",auth,(req,res)=>{
    res.send("Contenido visible solo para el admin");
})

export default router;