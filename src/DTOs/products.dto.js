class ProductDTO{
    constructor(product){
        this.title = product.title,
        this.description = product.description,
        this.code = product.code,
        this.price = product.price,
        this.status = product.status,
        this.stock = product.stock,
        this.thumbnails = product.thumbnails ? product.thumbnails : ["No Image Available"],
        this.thumbnail = this.thumbnails[0];
    }
}

export default ProductDTO;