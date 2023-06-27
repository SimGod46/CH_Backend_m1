// Responsabilidad de enviar a base de datos
import {Product} from '../models/product.model.js';

const persistProducts = async newProductInfo => {
        if (await Product.findOne({ code: newProductInfo.code })) {
            throw new Error('CODIGO repetido');
        }
        const newProduct = await Product.create(newProductInfo);
        return newProduct;
    }

const persistListProducts = async() => {
    let products = await Product.find();
    return products;
}

const persistOneProducts = async(id) => {
    let product = await Product.findById(id);
    return product;
}

const persistChangeProducts = async (id,update)=>{
    await Product.findByIdAndUpdate(id, update);
}

const persistRemoveProducts = async (id)=>{
    await Product.findByIdAndDelete(id);
}


export{
    persistProducts,
    persistListProducts,
    persistOneProducts,
    persistChangeProducts,
    persistRemoveProducts
};