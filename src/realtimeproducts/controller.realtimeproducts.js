import { Router } from "express";
const router = Router();
router.get("/",(req,res)=>{
    res.render("realTimeProducts.handlebars")

})

export default router;