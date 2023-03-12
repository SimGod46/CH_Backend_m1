import { Router } from "express";
const router = Router();
router.get("/",(req,res)=>{
    if(req.session.counter){
        req.session.counter++;
    } else {
        req.session.counter = 0;
    }
    res.render("welcome.handlebars",{conteo: req.session.counter, nombre: req.session.user})
})

router.get("/ingresar", async (req,res)=>{
    res.render("loginScreen.handlebars")
});

export default router;