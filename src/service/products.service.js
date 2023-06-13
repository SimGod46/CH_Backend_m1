// Responsabilidad de transformar la información antes de ser enviada a la DB
import { persistProducts } from "../persist/products.persist.js"

const addProduct = async (newProductInfo) =>{
    try{
        const newProduct = await persistProducts(newProductInfo);
        return newProduct;
    } catch(error){
        console.log(error);
    }
}

export {addProduct};