import realtimeproducts from "../controller/realtimeproducts.controller.js"
import products from "../controller/products.controller.js"
import navigation from "../controller/homeNav.controller.js"
import sessions from "../controller/auth.controller.js"
import carts from "../controller/carts.controller.js"
import routerPet from "../controller/pets.controller.js"
import mailControll from "../controller/mail.controller.js"

const routes = (app)=>{
    app.use('/realtimeproducts',realtimeproducts)
    app.use('/api/products',products)
    app.use('/api/sessions',sessions)
    app.use('/api/carts',carts)
    app.use('/api/pets',routerPet)
    app.use('/mail',mailControll)
    app.use('/',navigation) // ¡Esto es para que la primera vista sea el login!
    app.use("*", (req,res)=>
        res.status(404).json({error: "Not found"}))
}

export default routes;