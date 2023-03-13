import carts from "../endpoints/carts/controller.carts.js"
import products from "../endpoints/products/controller.products.js"
import realtimeproducts from "../endpoints/realtimeproducts/controller.realtimeproducts.js"
import cookies from "../endpoints/auth/controller.auth.js"
import loginCT from "../endpoints/homeNav/controller.homeNav.js"

const routes = (app)=>{
    app.use('/api/carts',carts)
    app.use('/api/products',products)
    app.use('/api/sessions',cookies)
    app.use('/realtimeproducts',realtimeproducts)
    app.use('/',loginCT) // Esto es para que la primera vista sea el login!
}

export default routes;