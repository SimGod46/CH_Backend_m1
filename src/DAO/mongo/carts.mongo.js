import {Cart} from './models/cart.model.js';
import {Ticket} from "./models/ticket.model.js"
class CartsMongoDao{
  constructor(){}

  async persistCarts () {
    const cart = new Cart({products: [] });
    await cart.save();
  }
  
  async persistOneCarts(cid){
    const cart = await Cart.findById(cid);
    return cart;
  }

  async createTicket(ticketInfo){
    const ticket = new Ticket({ticketInfo});
    await ticket.save();
  }
}

export default CartsMongoDao;