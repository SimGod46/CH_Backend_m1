class CartsMemoryDao{
  constructor(){
    this.carts = [];
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
}

export default CartsMemoryDao;