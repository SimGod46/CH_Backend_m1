import realtimeproducts from "../endpoints/realtimeproducts/controller.realtimeproducts.js"
import products from "../endpoints/products/controller.products.js"
import navigation from "../endpoints/homeNav/controller.homeNav.js"
import sessions from "../endpoints/auth/controller.auth.js"
import carts from "../endpoints/carts/controller.carts.js"
import routerPet from "../endpoints/pets/controller.pets.js"


const petsRouter = new routerPet()

const routes = (app)=>{
    app.use('/realtimeproducts',realtimeproducts)
    app.use('/api/products',products)
    app.use('/api/sessions',sessions)
    app.use('/api/carts',carts)
    app.use('/api/pets',petsRouter.getRouter())
    app.use('/',navigation) // Esto es para que la primera vista sea el login!
    app.use("*", (req,res)=>
        res.status(404).json({error: "Not found"}))
}

export default routes;