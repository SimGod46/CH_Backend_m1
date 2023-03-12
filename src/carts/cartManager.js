import {Cart} from '../models/cart.model.js';
import {Product} from '../models/product.model.js';

class CartManager {
    async createCart() {
      const cart = new Cart({ id: Math.floor(Math.random() * 1000000), products: [] });
      await cart.save();
    }
  
    async getCartById(cid) {
      const cart = await Cart.findOne({ id: cid }).populate("products.product");
      return cart ? cart.products : [];
    }
  
    async addProductToCart(cid, pid, quantity) {
      const cart = await Cart.findOne({ id: cid });
      if (!cart) {
        throw new Error("Cart not found");
      }
  
      const product = await Product.findOne({ _id: pid });
      if (!product) {
        throw new Error("Product not found");
      }
  
      const existingProduct = cart.products.find((p) => p.product._id.equals(pid));
      if (existingProduct) {
        existingProduct.quantity += quantity;
      } else {
        cart.products.push({ product: pid, quantity });
      }
  
      await cart.save();
    }
  
    async deleteProductFromCart(cid, pid) {
      const cart = await Cart.findOne({ id: cid });
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