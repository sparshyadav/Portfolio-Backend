require("dotenv").config();
const express=require("express");
const nodemailer=require("nodemailer");
const cors=require("cors");
const bodyParser = require("body-parser");

const app=express();
const PORT =process.env.PORT ||5000;

app.use(cors());
app.use(bodyParser.json());

app.post('/send-email', async(req, res)=>{
    const {to, subject, message}=req.body;

    if(!to || !subject || !message){
        return res.status(400).json({error: "All FIelds are Required"});
    }

    try{
        let transporter=nodemailer.createTransport({
            service: "gmail",
            auth:{
                user: process.env.EMAIL,
                pass: process.env.PASSWORD
            }
        });

        let mailOptions={
            from: process.env.EMAIL,
            to,
            subject,
            text: message
        }

        let info=await transporter.sendMail(mailOptions);
        res.status(200).json({message: "Email Sent Successfully", info});
    }
    catch(error){
        console.error(error);
        res.status(500).json({error: "Failed to Send Email"});
    }
});

app.listen(PORT, ()=>{
    console.log(`Server Running on Port: ${PORT}`)
})
