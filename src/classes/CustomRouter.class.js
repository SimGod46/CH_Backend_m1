//const { Router } = require("express")
import { Router } from "express"
import { authToken } from "../utils.js"
class CustomRouter{
    constructor(){
        this.router = Router()
        this.init()
    }

    init(){}

    getRouter(){
        return this.router
    }

    get(path,policies,...callbacks){
        this.router.get(path,this.handlePolicies(policies),this.generateCustomResponses ,this.applyCallbacks(callbacks))       
    }

    post(path,policies,...callbacks){
        this.router.post(path,this.handlePolicies(policies),this.generateCustomResponses, this.applyCallbacks(callbacks))       
    }

    put(path,policies,...callbacks){
        this.router.put(path,this.handlePolicies(policies),this.generateCustomResponses, this.applyCallbacks(callbacks))       
    }

    applyCallbacks(callbacks){
        return callbacks.map((callback)=>async(...params)=>{
            try{
                await callback.apply(this,params)
            } catch (error) {
                console.log(error)
                params[1].status(500).json({error}) // params es (req,res, middleware, etc, etc) por lo tanto params[1] es igual a res.
            }
        })
    }

    generateCustomResponses(req,res,next){
        res.sendSuccess = payload => res.status(200).json({message:payload})
        res.sendServerError = error => res.status(500).json({error: "Internal server error"})
        res.sendUserError = error => res.status(400).json({error:error})
        next();
    }

    handlePolicies(policies){
        return(req,res,next)=>{
            if(policies.includes("PUBLIC")){
                return next();
            }

            authToken(req,res,next)

            if (!policies.includes(req.user.role.toUpperCase())){
                return res.status(403).json({error:"Not authorized"})
            }
            next()


        }
    }
}
//module.exports = CustomRouter
export default CustomRouter