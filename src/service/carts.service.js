import {cartsServices} from "../repositories/index.js";
import {getProductById} from "./products.service.js"

const createCart = async() => {
    await cartsServices.persistCarts();
  }

const getCartById= async(cid)=> {
    const cart = await cartsServices.persistOneCarts(cid);
    if (!cart){
        throw new Error("Cart not found");
    }
    return cart;
  }

const addProductToCart = async(cid, pid, quantity) =>{
    const cart = await getCartById(cid);
    const product = await getProductById(pid); // Verificar que exista el producto antes de agregarlo al carro

    const existingProductIndex = cart.products.findIndex((p) => p.product._id.equals(pid));
    if (existingProductIndex !== -1) {
      cart.products[existingProductIndex].quantity += quantity;
    } else {
      cart.products.push({ product: pid, quantity:1 });
    }

    await cart.save();
  }

const deleteProductFromCart = async(cid, pid) =>{
    const cart = await getCartById(cid);

    const existingProductIndex = cart.products.findIndex((p) => p.product._id.equals(pid));
    if (existingProductIndex === -1) {
      throw new Error("Product not found in cart");
    }

    cart.products.splice(existingProductIndex, 1);

    await cart.save();
  }

  export{
    createCart,
    getCartById,
    addProductToCart,
    deleteProductFromCart
  }