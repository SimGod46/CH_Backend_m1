class CartsRepository{
    constructor(dao){
        this.dao = dao;
    }

    async persistCarts () {
        try{
            return this.dao.persistCarts();
        } catch (error){
            throw error;
        }
    }

    async persistOneCarts(cid){
        try{
            return this.dao.persistOneCarts(cid);
        }catch(error){
            throw error;
        }

    }
}

export default CartsRepository;