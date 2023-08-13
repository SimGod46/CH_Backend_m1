// Responsabilidad de transformar la información antes de ser enviada a la DB
//import productsPersist from "../DAO/factory.js";
import { productsServices } from "../repositories/index.js";
import {io} from "../index.js"

const addProduct = async (newProductInfo) =>{
    try{
        const newProduct = await productsServices.persistProducts(newProductInfo);
        return newProduct;
    } catch(error){
        console.log(error);
    }
    await getProducts(10,true);
};

const getProducts = async(limit, realtime=false) => {
    let listProducts = await productsServices.persistListProducts(limit, realtime);
    if (limit) {
        listProducts = listProducts.slice(0, limit);
    }
    if (realtime){
        io.emit("productsList",listProducts);
    }
    return listProducts;
}

const getProductById = async(id)=>{
    const product = await productsServices.persistOneProducts(id);
    if (product) {
        return product;
    } else {
        throw new Error('Not Found');
    }
}

const updateProduct = async (id,update)=>{
    await productsServices.persistChangeProducts(id,update);
    await getProducts(10,true);
}

const deleteProduct = async (id)=>{
    await productsServices.persistRemoveProducts(id);
    await getProducts(10,true);
}

export {addProduct, getProducts, getProductById,updateProduct,deleteProduct};