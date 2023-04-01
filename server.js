 const express = require('express');
 const moragan = require('morgan');
 const dotenv = require('dotenv');

 dotenv.config();

 //rest object for express
 const app=express()

 //middlewares
 app.use(express.json());//to avoid error on parsing any json obj in the body
 app.use(moragan('dev'));

 //routes
 app.get('/',(req,res)=>{
     res.status(200).send({
        message:"server running",
     });
 });

 const port=process.env.PORT;
  
//listen port
app.listen(port,()=>{
    console.log(
        `server is running in ${process.env.NODE_MODE} mode on port 8080`
    );
});