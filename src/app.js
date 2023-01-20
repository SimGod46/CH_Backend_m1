import express from 'express'
import routes from "./routes/index.js"

const port = 8080;
const app = express();

app.use(express.urlencoded({extended:true}));
app.use(express.json());

routes(app);
app.listen(port,()=>console.log("Running from express"))