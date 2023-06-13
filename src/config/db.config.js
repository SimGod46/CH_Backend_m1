import dotenv from "dotenv";
dotenv.config();
export const {
    db_user = process.env.DB_USER,
    password = process.env.PASSWORD,
    host = process.env.HOST } = {};