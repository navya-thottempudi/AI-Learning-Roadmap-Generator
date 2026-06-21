const express=require("express");
const app=express();
const port=process.env.PORT || 6700;

//To tell app where static files are stored
app.use(express.static("frontend"));
app.listen(port,function(){
    console.log("App runnning on http://localhost:"+port);
});