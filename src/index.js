import express from 'express'
import fs from 'fs' 
class ProductManager{
    constructor(route){
        this.products = [];
        this.LastId = 0;
        this.path = route;
        this.editFile(true);
    }
    addProduct(titulo,descripcion,precio,miniatura,codigo,inventario){
        const repeatedCodes = this.products.filter((x)=>x.code==codigo);
        if (repeatedCodes.length > 0){
            console.log("codigo ya existente...")
        } else{
            const product={
                title:titulo,
                description:descripcion,
                price:precio,
                thumbnail:miniatura,
                code:codigo,
                stock:inventario,
                id:this.LastId
            }
            this.products.push(product);
            this.LastId++;
        }
        this.editFile(false); 
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

const instancia = new ProductManager("./datos.JSON");

const app = express()
app.get("/usuarios",(req,res)=>{
    res.send("hi user")
})
app.use(express.urlencoded({extended:true}))

app.get("/products",(req,res)=>{
    let limite = req.query.limit;
    let products_array = instancia.getProducts();
    if (limite>0 && limite<products_array.length){
        res.send(products_array.slice(0,limite))        
    } else
       res.send(products_array)
})

app.get("/products/:pid",(req,res)=>{
    let {pid} = req.params;
    res.send(instancia.getProductById(pid));
})

app.listen(8080,()=>console.log("running from express"))