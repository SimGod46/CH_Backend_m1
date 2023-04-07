import realtimeproducts from "../endpoints/realtimeproducts/controller.realtimeproducts.js"
import products from "../endpoints/products/controller.products.js"
import navigation from "../endpoints/homeNav/controller.homeNav.js"
import sessions from "../endpoints/auth/controller.auth.js"
import carts from "../endpoints/carts/controller.carts.js"

const routes = (app)=>{
    app.use('/realtimeproducts',realtimeproducts)
    app.use('/api/products',products)
    app.use('/api/sessions',sessions)
    app.use('/api/carts',carts)
    app.use('/',navigation) // Esto es para que la primera vista sea el login!
}

export default routes;