import { Router } from "express";
import transport from "../mail.util.js";
import { mailUser } from "../config/yahoo.config.js"
const router = Router();

router.get("/",async (req,res)=> {
try{
    const {to, subject, message} = req.body;
    const result = await transport.sendMail({
        from: mailUser,
        to: to,
        subject: subject,
        html: `
        <html>
            <div>
            ${message}
            <img src="cid:basket" alt="un jugador de basketball">
            </div>
        </html>
        `,
        attachments: [{
            filename:"mailAttach.jpg",
            path: process.cwd()+"/src/images/mailAttach.jpg",
            cid:"basket"
        }]
    });
    res.json({message: result});
} catch (error){
    res.status(500).json({status:"error",error: error.message})
}
});



export default router;