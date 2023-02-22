import carts from "../carts/controller.carts.js"
import products from "../products/controller.products.js"
import realtimeproducts from "../realtimeproducts/controller.realtimeproducts.js"



const routes = (app)=>{
    app.use('/api/carts',carts)
    app.use('/api/products',products)
    app.use('/realtimeproducts',realtimeproducts)
}

export default routes;