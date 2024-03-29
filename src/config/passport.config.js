import passport from "passport";
import local from "passport-local";
import { createHash, isValidPassword } from "../utils.js";
import GitHubStrategy from "passport-github2";
import { Usuario } from "../DAO/mongo/models/users.model.js";
import dotenv from "dotenv";
dotenv.config();

const LocalStrategy = local.Strategy;
const initializePassport = () =>{
    passport.use("register",new LocalStrategy(
        {passReqToCallback:true,usernameField:"email"}, async (req,username,password,done)=>{
            const {first_name,last_name,email,age} = req.body;
            try{
                const user = await Usuario.findOne({email:username});
                if(user){
                    console.log("User already exists");
                    return done(null,false);
                }
                const newUserInfo = {
                    first_name,
                    last_name,
                    email,
                    age,
                    password:createHash(password)
                }
                let result = await Usuario.create(newUserInfo);
                return done(null,result);
            } catch(error){
                return done(error);
            }
        }
    ))
    passport.serializeUser((user,done)=>{
        done(null,user.id)
    })
    passport.deserializeUser(async (id,done)=>{
        const user = await Usuario.findById(id);
        done(null,user);
    })

    passport.use("login",new LocalStrategy(
        {passReqToCallback:true,
        usernameField: "nombreUsuario",    // Nombre del campo del formulario para el nombre de usuario
        passwordField: "contrasenhaUsuario"},
        async (req,username,password,done)=>{
            try {
                const usuario = await Usuario.findOne({ email: username})
                if (!usuario || !isValidPassword(usuario,password)){
                    return done(null,false);
                }               
                return done(null,usuario); 
            } catch (error) {
                return done(error)
            }
        }        
    ))

    passport.use("github",new GitHubStrategy({
        clientID: process.env.GIT_CLIENT_ID,
        clientSecret:process.env.GIT_CLIENT_SECRET,
        callbackURL:"http://localhost:8080/api/sessions/githubcallback"
    }, async(accessToken,refreshToken,profile,done)=>{
        try {
            const user = await Usuario.findOne({email:profile._json.email})
            if(user){
                console.log("User already exists");
                return done(null,false);
            }
            const newUserInfo = {
                first_name:profile._json.name,
                last_name:"",
                email:profile._json.email,
                age:99,
                password:""
            }
            let result = await Usuario.create(newUserInfo);
            return done(null,result);
        } catch (error) {
            return done(error);
        }
    }
    ))

};
export default initializePassport;