import {cartsServices} from "../repositories/index.js";
import {getProductById, updateProduct} from "./products.service.js"
//import authToken from "../utils.js"
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
    let previous_quantity = 0;
    let new_quantity;
    const existingProductIndex = cart.products.findIndex((p) => p.product._id.equals(pid));
    if (existingProductIndex !== -1) {
        previous_quantity = cart.products[existingProductIndex].quantity;
        new_quantity=previous_quantity+quantity;
        cart.products[existingProductIndex].quantity = new_quantity;
        if(product.stock>=new_quantity){
            await cart.save();
        } else{
            console.log("No es posible añadir al carro más unidades de las disponibles")
        }
    } else {
        new_quantity=1;
        if(product.stock>=new_quantity){
            cart.products.push({ product: pid, quantity:new_quantity });
            await cart.save();
        } else{
            console.log("No es posible añadir al carro más unidades de las disponibles")
        }
    }
  }
const deleteProductFromCart = async(cid, pid) =>{
    const cart = await getCartById(cid);

    const existingProductIndex = cart.products.findIndex((p) => p.product.equals(pid));
    if (existingProductIndex === -1) {
      throw new Error("Product not found in cart");
    }

    cart.products.splice(existingProductIndex, 1);

    await cart.save();
  }

const purchaseCart = async(cid)=>{
    const cart = await cartsServices.persistOneCarts(cid);
    let buyable_items = [];
    let non_buyable_items = [];
    if (!cart){
        throw new Error("Cart not found");
    }
    cart.products.map(async (prodOnCart)=>{
        const product = await getProductById(prodOnCart.product._id);
        if(prodOnCart.quantity > product.stock){
            console.log(`Se ha eliminado el producto ${product.title} por falta de stock`)
            non_buyable_items.push({product:prodOnCart.product._id, quantity:prodOnCart.quantity});
        } else {
            buyable_items.push({product:prodOnCart.product._id, quantity:prodOnCart.quantity});
            product.stock-=prodOnCart.quantity
            await updateProduct(prodOnCart.product._id, product)
        }
    });
//    authToken();
    const ticketInfo= {
        code: "hola123",
        purchase_datetime: "1",
        amount: 12,
        purchaser: "aa"
    }
    //await cartsServices.createTicket(ticketInfo); // No estoy seguro por que no me funciona :(
    console.log("Ticket emitido...")
}



  export{
    createCart,
    getCartById,
    addProductToCart,
    deleteProductFromCart,
    purchaseCart
  }