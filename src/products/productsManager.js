import {Product} from '../models/product.model.js';
import io from "socket.io-client";
import {url} from "../utils.js"

class ProductManager{
    constructor(){
        this.socket = io(url);
        this.socket.connect();
        console.log("Este es el socket desde PM: "+this.socket.id+" "+url)

    }
    async addProduct(titulo,descripcion,precio,miniaturas,codigo,inventario,estado=true){
        if (await Product.findOne({ code: codigo })) {
            throw new Error('CODIGO repetido');
        }

        const product = new Product({
            title: titulo,
            description: descripcion,
            code: codigo,
            price: precio,
            status: estado,
            thumbnail: miniaturas[0],
            thumbnails: miniaturas,
            stock: inventario,
        });

        await product.save();
        this.socket.emit("productsUpdated",await Product.find());
    }

    async getProducts(limit, realtime=false){
        let products = await Product.find();

        if (limit) {
            products = products.slice(0, limit);
        }
        if (realtime){
            this.socket.emit("productsUpdated",products);
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
        this.socket.emit("productsUpdated",await Product.find());
    }

    async deleteProduct(id){
        await Product.findByIdAndDelete(id);
        this.socket.emit("productsUpdated",await Product.find());
    }
}

export const productos = new ProductManager();