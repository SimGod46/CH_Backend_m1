import { Router } from "express";
import {Cart} from '../models/cart.model.js';

const router = Router();

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

const cartManager = new CartManager();

router.post("/", async (req, res) => {
  await cartManager.createCart();
  res.status(200).send();
});

router.get("/:cid", async (req, res) => {
  const { cid } = req.params;
  const cart = await cartManager.getCartById(cid);
  res.send({ status: "success", payload: cart });
});

router.post("/:cid/product/:pid", async (req, res) => {
  const { cid, pid } = req.params;
  const { quantity } = req.body;
  try {
    await cartManager.addProductToCart(cid, pid, quantity);
    res.send({ status: "success", payload: await cartManager.getCartById(cid) });
  } catch (err) {
    res.status(400).send({ status: "error", error: err.message });
  }
});

router.delete("/:cid/product/:pid", async (req, res) => {
  const { cid, pid } = req.params;
  try {
    await cartManager.deleteProductFromCart(cid, pid);
    res.status(200).send();
  } catch (err) {
    res.status(400).send({ status: "error", error: err.message });
  }
});

export default router;