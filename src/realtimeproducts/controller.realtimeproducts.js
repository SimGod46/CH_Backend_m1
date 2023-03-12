import { Router } from "express";
import {productos} from "../products/productsManager.js"

const router = Router();
router.get("/",async (req,res)=>{
    await productos.getProducts(10,true);
    res.render("realTimeProducts.handlebars");
})

export default router;