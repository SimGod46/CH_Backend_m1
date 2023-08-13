import dotenv from "dotenv";
dotenv.config();
export const {
    serviceMail = process.env.SERICE_MAIL,
    serviceMailPort = process.env.SERICE_MAIL_PORT,
    gmailUser = process.env.GMAIL_USER,
    gmailPassword = process.env.GMAIL_PASSWORD } = {};