import { Router } from "express";
import { createCart, getCartById, addProductToCart, deleteProductFromCart, purchaseCart } from "../service/carts.service.js";

const router = Router();

router.post("/", async (req, res) => {
  await createCart();
  res.status(200).send();
});

router.get("/:cid", async (req, res) => {
  const { cid } = req.params;
  const cart = await getCartById(cid);
  res.send({ status: "success", payload: cart });
});

router.post("/:cid/product/:pid", async (req, res) => {
  const { cid, pid } = req.params;
  const { quantity } = req.body; //TODO: Probar con un formulario?
  try {
    await addProductToCart(cid, pid, quantity);
    res.send({ status: "success", payload: await getCartById(cid) });
  } catch (err) {
    res.status(400).send({ status: "error", error: err.message });
  }
});

router.delete("/:cid/product/:pid", async (req, res) => {
  const { cid, pid } = req.params;
  try {
    await deleteProductFromCart(cid, pid);
    res.status(200).send();
  } catch (err) {
    res.status(400).send({ status: "error", error: err.message });
  }
});

router.post("/:cid/purchase",async(req,res)=>{
  const { cid } = req.params;
  await purchaseCart(cid);
})

export default router;