import nodemailer from "nodemailer" ;
import {
    serviceMail,
    serviceMailPort,
    mailUser,
    mailPassword
} from "./config/yahoo.config.js"
const transport = nodemailer.createTransport({
    host: 'smtp.mail.yahoo.com',
    service: serviceMail,
    port: serviceMailPort,
    auth:{
        user: mailUser,
        pass: mailPassword
    }    
})

export default transport;


