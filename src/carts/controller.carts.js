import { Router } from "express";
import { cartManager } from "./cartManager.js";

const router = Router();

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