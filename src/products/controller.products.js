import { Router } from "express";
import {io} from "socket.io-client";
import {Product} from '../models/product.model.js';

const socket = io();
const router = Router();

class ProductManager{
    async addProduct(titulo,descripcion,precio,miniatura,codigo,inventario,estado=true){
        if (await Product.findOne({ code: codigo })) {
            throw new Error('CODIGO repetido');
        }

        const product = new Product({
            title: titulo,
            description: descripcion,
            code: codigo,
            price: precio,
            status: estado,
            thumbnail: miniatura,
            stock: inventario,
        });

        await product.save();
        io.emit("productsUpdated",await Product.find())
    }

    async getProducts(limit){
        let products = await Product.find();
        if (limit) {
            products = products.slice(0, limit);
        }
        return products;
    }

    async getProductById(id){
        const product = await Product.findById(id);
        if (product) {
            return product;
        } else {
            throw new Error('Not Found');
        }
    }

    async updateProduct(id,update){
        await Product.findByIdAndUpdate(id, update);
        io.emit("productsUpdated",await Product.find())
    }

    async deleteProduct(id){
        await Product.findByIdAndDelete(id);
        io.emit("productsUpdated",await Product.find())
    }
}


const productos = new ProductManager();

function midType(req,res,next){
    if(req.body.title !== undefined && req.body.description !== undefined && req.body.code !== undefined && req.body.price !== undefined && req.body.status !== undefined && req.body.stock !== undefined){
        req.body.title = String(req.body.title);
        req.body.description = String(req.body.description);
        req.body.code = String(req.body.code);
        req.body.price = Number(req.body.price);
        req.body.status = Boolean(req.body.status);
        req.body.stock = Number(req.body.stock);
    //   req.body.thumbnails = 
        next()
    } else {
        res.status(400).send({status:"error",error: "TODOS los campos son obligarios (excepto thumbnails)"});
    }

}

router.get("/", async (req,res)=>{
    let limite = req.query.limit;
    let products = await productos.getProducts(limite);
    res.send({status:"success",payload: products})
});

router.get("/:pid", async (req,res)=>{
    let {pid} = req.params;
    try {
        let product = await productos.getProductById(pid);
        res.send({status:"success",payload: product})
    } catch (error) {
        res.status(404).send({status:"error",error: error.message});
    }
});

router.post("/",midType,async (req,res)=>{
    let {title,description,code,price,status,stock,thumbnails} = req.body;
    try {
        await productos.addProduct(title,description,price,thumbnails,code,stock,status);
        return res.status(200).send();
    } catch (error) {
        return res.status(400).send({status:"error",error: error.message});
    }
});

router.put("/:pid",async (req,res)=>{
    let {pid} = req.params;
    let {title,description,code,price,status,stock,category,thumbnails} = req.body;
    try {
        await productos.updateProduct(pid,{title,description,code,price,status,stock,category})
        return res.status(200).send();
    } catch (error) {
        return res.status(400).send({status:"error",error: error.message});
    }
});

router.delete("/:pid", async (req, res) => {
    const { pid } = req.params;
    try {
      const product = await productos.findOneAndDelete({ _id: pid });
      if (product) {
        socket.emit("productsUpdated", await productos.find().toArray());
        return res.status(200).send();
      } else {
        return res.status(404).send({ message: "Product not found" });
      }
    } catch (err) {
      console.error(err);
      return res.status(500).send({ message: "Server error" });
    }
  });
  

export default router;