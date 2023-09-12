import { Router } from "express";
import { generateProducts } from "../mock.util.js"

const router = Router();
router.get("/", (req,res)=>{
    const productList = generateProducts(100);
    res.send(productList);
})

export default router;