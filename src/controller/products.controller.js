// Responsabilidad de enviar información
import { Router } from "express";
import { addProduct,getProducts,getProductById,updateProduct,deleteProduct  } from "../service/products.service.js";
const router = Router();

function midType(req,res,next){
    if(req.body.title === undefined || req.body.description === undefined || req.body.code === undefined || req.body.price === undefined || req.body.status === undefined || req.body.stock === undefined){
        res.status(400).send({status:"error",error: "TODOS los campos son obligatorios (excepto thumbnails)"});
    }
    req.body.title = String(req.body.title);
    req.body.description = String(req.body.description);
    req.body.code = String(req.body.code);
    req.body.price = Number(req.body.price);
    req.body.status = Boolean(req.body.status);
    req.body.stock = Number(req.body.stock);
    next()
}

router.get("/", async (req,res)=>{
    let limite = req.query.limit;
    let products = await getProducts(limite);
    res.send({status:"success",payload: products})
});

router.get("/:pid", async (req,res)=>{
    let {pid} = req.params;
    try {
        let product = await getProductById(pid);
        res.send({status:"success",payload: product})
    } catch (error) {
        res.status(404).send({status:"error",error: error.message});
    }
});

router.post("/",midType,async (req,res)=>{
    try{
        const product = req.body;
        const newProduct = await addProduct(product);
        res.json({message:newProduct})
    } catch(error){

    }
});

router.put("/:pid",async (req,res)=>{
    let {pid} = req.params;
    const product = req.body;
    try {
        await updateProduct(pid,product)
        return res.status(200).send({status:"success"});
    } catch (error) {
        return res.status(400).send({status:"error",error: error.message});
    }
});

router.delete("/:pid", async (req, res) => {
    const { pid } = req.params;
    try {
        await deleteProduct(pid);
        return res.status(200).send({status:"success"});
      } catch (err) {
        return res.status(404).send({ message: "Product not found" });
      }
  });
  

export default router;