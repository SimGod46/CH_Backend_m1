import { Router } from "express";
import fs from 'fs' 

const router = Router();

const getMax = (arr, prop) => {
    const tmp = arr.map(x => x[prop]);
    return Math.max(...tmp,0);
  }

class CartManager{
    constructor(route,route_prod){
        this.carts = [];
        this.products = [];
        this.LastId = 0;
        this.path = route;
        this.path_products = route_prod;
        this.editFile(true);
    }

    editFile(init){
        if(init && fs.existsSync(this.path)){
            this.carts = JSON.parse(fs.readFileSync(this.path,"utf-8").toString());
        } else{
            let data_obj_str=JSON.stringify(this.carts);
            fs.writeFileSync(this.path,data_obj_str);
        }
    }

    availableProduct(pid){
        if(fs.existsSync(this.path_products)){
            this.products = JSON.parse(fs.readFileSync(this.path,"utf-8").toString());
        }
        const product = this.products.filter((x)=>x.id == pid);
        return product.length>0
    }

    availableProductOnCart(cid,pid){ //Según lo que entiendo de la consignia no se puede repetir el codigo...
        let tempCart =  this.getCartById(cid);
        const product = this.products.filter((x)=>x.id == pid);
        const repeatedCode = tempCart.map((x)=> x.code )
        return !repeatedCode.includes(product[0]);
    }

    createCart(){
        this.LastId = getMax(this.carts,"id")+1;
        const carrito={
            id:this.LastId, // Hacer que sea autoincrementable
            products:[]
        }
        this.carts.push(carrito);
        this.editFile(false);
    }

    getCartById(cid){
        return this.carts.filter((x)=>x.id == cid)[0].products
    }

    addProductToCart(cid,pid,cantidad){
        let newCarrito = this.carts.filter((x)=>x.id == cid)[0];
        let newProduct = {product:pid,quantity:cantidad}; // modificar para corroborar si existe el producto

        let existsCarrito = newCarrito["products"].filter((x)=>x.product == pid)
        if (existsCarrito.length>0){
            newProduct = {product:pid,quantity:existsCarrito[0].quantity+1};
        }
        newCarrito.products.push(newProduct);
        this.carts = this.carts.map((x)=>{
            if(x.id==cid){
                return newCarrito        
            }
            return x
            }
        );
        this.editFile(false);

        }
}

const carritos = new CartManager("./carts/carrito.JSON","./products/productos.JSON")

router.post("/",(req,res)=>{
    carritos.createCart();
    res.status(200).send()
})

router.get("/:cid",(req,res)=>{
    let {cid} = req.params;
    cid = parseInt(cid);
    res.send({status:"success",payload: carritos.getCartById(cid)});
})

router.post("/:cid/product/:pid",(req,res)=>{
    let {quantity} = req.body;
    let {cid, pid} = req.params;
    cid = parseInt(cid);
    pid = parseInt(pid);
    try{
        if(carritos.availableProduct(pid)){
            //res.send(carritos.carts.filter((x)=>x.id == cid)[0])
            if(carritos.availableProductOnCart(cid,pid)){ //Según lo que entiendo de la consignia no se puede repetir el codigo...
                carritos.addProductToCart(cid,pid,quantity)
                res.send({status:"success",payload: carritos.carts});
            }
            res.status(400).send({status:"error",error: "CODIGO del producto ya existente en el carrito"});
        } else {
            res.status(400).send({status:"error",error: "ID producto no valido"});
        }
    } catch(error){
        res.status(400).send({status:"error",error: "ID carrito no valido"});
    }
})

export default router;