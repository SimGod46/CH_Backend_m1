// Responsabilidad de enviar a base de datos
class ProductsMemoryDao{
    constructor(){
        this.products = []
    }

    async persistProducts(newProductInfo) {
        if (this.products.some(product => product.code === newProductInfo.code)) {
            throw new Error('CÓDIGO repetido');
        }

        const newProduct = { ...newProductInfo, _id: String(this.products.length + 1) };
        this.products.push(newProduct);

        return newProduct;
    }

    async persistListProducts() {
        return this.products;
    }

    async persistOneProducts(id) {
        const product = this.products.find(product => product._id === id);
        return product || null;
    }

    async persistChangeProducts(id, update) {
        const productIndex = this.products.findIndex(product => product._id === id);
        if (productIndex !== -1) {
            this.products[productIndex] = { ...this.products[productIndex], ...update };
        }
    }

    async persistRemoveProducts(id) {
        const productIndex = this.products.findIndex(product => product._id === id);
        if (productIndex !== -1) {
            this.products.splice(productIndex, 1);
        }
    }
}

export default ProductsMemoryDao;