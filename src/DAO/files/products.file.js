// Responsabilidad de enviar a base de datos
import fs from 'fs/promises';

class ProductsFileDao {
    constructor(filePath) {
        this.filePath = filePath;
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

    async persistProducts(newProductInfo) {
        const products = await this.readFile();

        if (products.some(product => product.code === newProductInfo.code)) {
            throw new Error('CÓDIGO repetido');
        }

        const newProduct = { ...newProductInfo, _id: String(products.length + 1) };
        products.push(newProduct);

        await this.writeFile(products);

        return newProduct;
    }

    async persistListProducts() {
        return this.readFile();
    }

    async persistOneProducts(id) {
        const products = await this.readFile();
        const product = products.find(product => product._id === id);
        return product || null;
    }

    async persistChangeProducts(id, update) {
        const products = await this.readFile();
        const productIndex = products.findIndex(product => product._id === id);
        if (productIndex !== -1) {
            products[productIndex] = { ...products[productIndex], ...update };
            await this.writeFile(products);
        }
    }

    async persistRemoveProducts(id) {
        const products = await this.readFile();
        const productIndex = products.findIndex(product => product._id === id);
        if (productIndex !== -1) {
            products.splice(productIndex, 1);
            await this.writeFile(products);
        }
    }
}

export default ProductsFileDao;