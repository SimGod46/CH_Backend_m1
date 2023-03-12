import {fileURLToPath} from "url";
import { dirname } from "path";
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const port = 8080;
const url = `http://localhost:${port}`
const mongoDB = "mongodb+srv://usuarioCoder:contraCoder@backendcoderhouse.g4y1oi7.mongodb.net/?retryWrites=true&w=majority"
export {__dirname, port,url,mongoDB};