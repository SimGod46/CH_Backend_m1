import nodemailer from "nodemailer" ;
import {
    serviceMail,
    serviceMailPort,
    gmailUser,
    gmailPassword
} from "./config/gmail.config.js"
const transport = nodemailer.createTransport({
    service: serviceMail,
    port: serviceMailPort,
    auth:{
        user: gmailUser,
        pass: gmailPassword
    }    
})


