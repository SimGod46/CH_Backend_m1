import passport from "passport";
import local from "passport-local";
import { createHash, isValidPassword } from "../utils";
import GitHubStrategy from "passport-github2";
import { Usuario } from "../models/users.model.js";

const LocalStrategy = local.Strategy;
const initializePassport = () =>{
    passport.use("register",new LocalStrategy(
        {passReqToCallback:true,usernameField:"email"}, async (req,username,password,done)=>{
            const {first_name,last_name,email,age} = req.body;
            try{
                let user = await userService.findOne({email:username});
                if(user){
                    console.log("User already existts");
                    return done(null,false);
                }
                const newUser = {
                    first_name,
                    last_name,
                    email,
                    age,
                    password:createHash(password)
                }
                let result = await userService.create(newUser);
                return done(null,result);
            } catch(error){
                return done("Error al obtener el usuario: "+error);
            }
        }
    ))
}
export default initializePassport;