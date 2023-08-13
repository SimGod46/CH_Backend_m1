import {Cart} from './models/cart.model.js';
class CartsMongoDao{
  constructor(){}

  async persistCarts () {
    const cart = new Cart({products: [] });
    await cart.save();
  }
  
  async persistOneCarts(cid){
    const cart = await Cart.findById(cid);
    return cart ? cart.products : [];
  }
}

export default CartsMongoDao;