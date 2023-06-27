import {Cart} from '../models/cart.model.js';

const persistCarts = async() => {
  const cart = new Cart({products: [] });
  await cart.save();
}

const persistOneCarts= async(cid)=> {
  const cart = await Cart.findById(cid);
  return cart ? cart.products : [];
}

export {
  persistCarts,
  persistOneCarts
};