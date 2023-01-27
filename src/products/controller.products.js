import { Router } from "express";
import fs from 'fs' 
import __dirname from "../utils.js";
import {io} from "socket.io-client";

const socket = io();
const router = Router();

const getMax = (arr, prop) => {
    const tmp = arr.map(x => x[prop]);
    return Math.max(...tmp,0);
  }

class ProductManager{
    constructor(route){
        this.products = [];
        this.LastId = 0;
        this.path = route;
        this.editFile(true);
    }
    addProduct(titulo,descripcion,precio,miniatura,codigo,inventario,estado=true){
        this.LastId=getMax(this.products,"id")+1;
        console.log(getMax(this.products,"id"));
        const product={
            title:titulo,
            description:descripcion,
            code:codigo,
            price:precio,
            status:estado,
            thumbnail:miniatura,
            stock:inventario,
            id:this.LastId
        }
        this.products.push(product);
        this.editFile(false);     
    } 

    existsCode(codigo){
        const repeatedCodes = this.products.filter((x)=>x.code==codigo);
        return repeatedCodes.length > 0
    }

    getProducts(){
       return this.products;
    }

    getProductById(id){
        const product = this.products.filter((x)=>x.id == id);
        if(product.length>0){
            return product
        }else{
            console.error("Not Found")
            return null
        }
    }
    // update = {title:"tituloCambiado",stock:24}
    updateProduct(id,update){
        this.products = this.products.map((x)=>{
            if(x.id==id){
                return {...x,...update};        
            }
            return x
        }
        )
        this.editFile(false);
    }

    deleteProduct(id){
        this.products = this.products.filter((x)=>x.id != id);
        this.editFile(false);
    }

    editFile(init){
        if(init && fs.existsSync(this.path)){
            this.products = JSON.parse(fs.readFileSync(this.path,"utf-8").toString());
        } else{
            let data_obj_str=JSON.stringify(this.products);
            fs.writeFileSync(this.path,data_obj_str);
        }
    }
}

const productos = new ProductManager(__dirname+"/products/productos.JSON");

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

router.get("/",(req,res)=>{
    let limite = req.query.limit;
    let products_array = productos.getProducts();
    if (limite>0 && limite<products_array.length){
        res.send({status:"success",payload:products_array.slice(0,limite)})
    } else
        res.send({status:"success",payload:products_array})
})

router.get("/:pid",(req,res)=>{
    let {pid} = req.params;
    pid = parseInt(pid);
    res.send({status:"success",payload:productos.getProductById(pid)})
})

router.post("/",midType,(req,res)=>{ //post("/",midType,(req,res) 
    let {title,description,code,price,status,stock,thumbnails} = req.body;
//    productos.addProduct(title,description,price,thumbnails,code,stock,status)
    if (productos.existsCode(code)){
        return res.status(400).send({status:"error",error: "CODIGO repetido"})
    } else{
        productos.addProduct(title,description,price,thumbnails,code,stock,status);
        socket.emit("productsUpdated",productos.getProducts())

    }
    return res.status(200).send()    
    
})

router.put("/:pid",(req,res)=>{
    let {pid} = req.params;
    pid = parseInt(pid);
    let {title,description,code,price,status,stock,category,thumbnails} = req.body;
    productos.updateProduct(pid,{title,description,code,price,status,stock,category,thumbnails})
    return res.status(200).send()
})

router.delete("/:pid",(req,res)=>{
    let {pid} = req.params;
    pid = parseInt(pid);
    productos.deleteProduct(pid)
    socket.emit("productsUpdated",productos.getProducts())
    return res.status(200).send()
})

export default router;