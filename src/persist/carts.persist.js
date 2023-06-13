import {Cart} from '../models/cart.model.js';
import {Product} from '../models/product.model.js';

class CartManager {
    async createCart() {
      const cart = new Cart({products: [] });
      await cart.save();
    }
  
    async getCartById(cid) {
      const cart = await Cart.findById(cid);
      return cart ? cart.products : [];
    }
  
    async addProductToCart(cid, pid, quantity) {
      const cart = await Cart.findById(cid);
      if (!cart) {
        throw new Error("Cart not found");
      }
  
      const product = await Product.findById(pid);
      if (!product) {
        throw new Error("Product not found");
      }
  
      const existingProductIndex = cart.products.findIndex((p) => p.product._id.equals(pid));
      if (existingProductIndex !== -1) {
        cart.products[existingProductIndex].quantity += quantity;
      } else {
        cart.products.push({ product: pid, quantity:1 });
      }
  
      await cart.save();
    }
  
    async deleteProductFromCart(cid, pid) {
      const cart = await Cart.findById(cid);
      if (!cart) {
        throw new Error("Cart not found");
      }
  
      const existingProductIndex = cart.products.findIndex((p) => p.product._id.equals(pid));
      if (existingProductIndex === -1) {
        throw new Error("Product not found in cart");
      }
  
      cart.products.splice(existingProductIndex, 1);
  
      await cart.save();
    }
}

export const cartManager = new CartManager();