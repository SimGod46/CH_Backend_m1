import ProductDTO from "../DTOs/products.dto.js";

class ProductsRepository{
    constructor(dao){
        this.dao = dao;
    }

    async persistProducts(product){
        try {
            const newProductInfo = new ProductDTO(product) // {title,description,code,price,status,stock,thumbnails}
            return await this.dao.persistProducts(newProductInfo);            
        } catch (error) {
            throw error;
        }
    }

    async persistListProducts(){
        try {
            return await this.dao.persistListProducts();            
        } catch (error) {
            throw error;
        }
    }

    async persistOneProducts(id){
        try {
            return await this.dao.persistOneProducts(id);            
        } catch (error) {
            throw error;
        }
    }

    async persistChangeProducts(id,product){
        try {
            const newProductInfo = new ProductDTO(product)
            return await this.dao.persistChangeProducts(id,newProductInfo);            
        } catch (error) {
            throw error;
        }
    }

    async persistRemoveProducts(id){
        try {
            return await this.dao.persistRemoveProducts(id);            
        } catch (error) {
            throw error;
        }
    }
}

export default ProductsRepository;