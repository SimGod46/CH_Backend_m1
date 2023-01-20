import carts from "../carts/controller.carts.js"
import products from "../products/controller.products.js"

const routes = (app)=>{
    app.use('/api/carts',carts)
    app.use('/api/products',products)
}

export default routes;