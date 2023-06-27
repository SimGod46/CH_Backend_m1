// Responsabilidad de transformar la información antes de ser enviada a la DB
import { persistProducts,persistListProducts,persistOneProducts,persistChangeProducts,persistRemoveProducts } from "../persist/products.persist.js"
import {io} from "../index.js"

const addProduct = async (newProductInfo) =>{
    try{
        newProductInfo.thumbnail = newProductInfo.thumbnails[0];
        const newProduct = await persistProducts(newProductInfo);
        return newProduct;
    } catch(error){
        console.log(error);
    }
    getProducts(10,realtime=true);
};

const getProducts = async(limit, realtime=false) => {
    let listProducts = persistListProducts(limit, realtime);
    if (limit) {
        listProducts = listProducts.slice(0, limit);
    }
    if (realtime){
        io.emit("productsList",listProducts);
    }
    return listProducts;
}

const getProductById = async(id)=>{
    const product = await persistOneProducts(id);
    if (product) {
        return product;
    } else {
        throw new Error('Not Found');
    }
}

const updateProduct = async (id,update)=>{
    await persistChangeProducts(id,update);
    getProducts(10,realtime=true);
}

const deleteProduct = async (id)=>{
    await persistRemoveProducts(id);
    getProducts(10,realtime=true);
}

export {addProduct, getProducts, getProductById,updateProduct,deleteProduct};