class CartsMemoryDao{
  constructor(){
    this.carts = [];
    this.tickets =[];
  }

  async persistCarts () {
    //const cart = new Cart({products: [] });
    const cart = { id: this.carts.length + 1, products: [] };
    this.carts.push(cart);
  }
  
  async persistOneCarts(cid){
    const cart = this.carts.find(cart => cart.id === cid);
    return cart ? cart.products : [];
  }

  async createTicket(ticketInfo){
    const ticket = { id: this.tickets.length + 1 };
    this.tickets.push(ticket);
  }
}

export default CartsMemoryDao;