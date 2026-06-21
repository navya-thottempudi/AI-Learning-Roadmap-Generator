require("dotenv").config();
const express=require("express");
const app=express();
const port=process.env.PORT || 6700;

//To tell app where static files are stored
app.use(express.json());
app.use(express.static("frontend"));

app.post("/generate-roadmap", async (req,res)=>{

    try{

        const response = await fetch(

        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,

        {

            method:"POST",

            headers:{
                "Content-Type":"application/json"
            },

            body:JSON.stringify(req.body)

        }

        );

        const data =
        await response.json();

        res.json(data);

    }

    catch(error){

        console.error(error);

        res.status(500).json({

            error:"Server Error"

        });

    }

});

app.listen(port,function(){
    console.log("App runnning on http://localhost:"+port);
});