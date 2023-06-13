import {db_user,password,host} from "../src/config/db.config.js"
import MongoStore from 'connect-mongo';
import mongoose from 'mongoose';

const mongoDB = `mongodb+srv://${db_user}:${password}@${host}/?retryWrites=true&w=majority`
mongoose.set("strictQuery",false);
const dbConnect = async ()=>{
    try{
        console.log(`Conectando a: ${mongoDB}`);
        await mongoose.connect(mongoDB);
        console.log("DB Connected");
    } catch (error){
        console.log(error);
    }
}

const sessionStorage = MongoStore.create({
    mongoUrl:mongoDB,
    mongoOptions:{useNewUrlParser:true,useUnifiedTopology:true},
    ttl:150
});

export {dbConnect,sessionStorage};