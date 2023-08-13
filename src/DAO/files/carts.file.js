import fs from 'fs/promises';

class CartsFileDao {
  constructor() {
    this.filePath = "./db/cart.localdb.json";
  }

  async readFile() {
    try {
      const content = await fs.readFile(this.filePath, 'utf-8');
      return JSON.parse(content);
    } catch (error) {
      if (error.code === 'ENOENT') {
        return [];
      }
      throw error;
    }
  }

  async writeFile(data) {
    await fs.writeFile(this.filePath, JSON.stringify(data, null, 2), 'utf-8');
  }

  async persistCarts() {
    const carts = await this.readFile();
    const newCart = { id: String(carts.length + 1), products: [] };
    carts.push(newCart);

    await this.writeFile(carts);
  }

  async persistOneCarts(cid) {
    const carts = await this.readFile();
    const cart = carts.find(cart => cart.id === cid);
    return cart ? cart.products : [];
  }
}

export default CartsFileDao;