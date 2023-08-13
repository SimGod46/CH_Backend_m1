import dotenv from "dotenv";
dotenv.config();
export const {
    serviceMail = process.env.SERICE_MAIL,
    serviceMailPort = process.env.SERICE_MAIL_PORT,
    mailUser = process.env.MAIL_USER,
    mailPassword = process.env.MAIL_PASSWORD } = {};