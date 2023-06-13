import CustomRouter from"../classes/CustomRouter.class.js"


class routerPet extends CustomRouter{
    init(){
        const pets = []

        this.router.param("pet",(req,res,next,pet)=>{
            const regex = /^[a-zA-Z%20]+$/
            if(regex.test(pet)){
                req.pet = pet
                next()
            }else {
                res.status(400)
                .json({error:"Pet no tiene caracteres validos"})
            }
        })

        this.post("/",["PUBLIC"],(req,res)=>{
            const {name, specie} = req.body
            let mascota = {
                name: name, 
                specie, specie
            }
            pets.push(mascota)
            res.json(pets)
        
        });
        
        this.get("/:pet",["PUBLIC"],(req,res)=>{
            // const { pet } = req.params // no es necesario gracias al middleware
            const pet = req.pet;
            const searchPet = pets.find(petArray => petArray.name === pet);

            if (!searchPet){
                req.pet = null
            } else {
                req.pet = pet
            }
            res.json(req.pet)
        });
        
        this.put("/:pet",["PUBLIC"],(req,res)=>{
            // const { pet } = req.params // no es necesario gracias al middleware
            const pet = req.pet 
            const searchPet = pets.find(petArray => petArray.name === pet)
            if (searchPet) searchPet.adopted = true
            res.json(pets)
        });
    }
}

export default routerPet