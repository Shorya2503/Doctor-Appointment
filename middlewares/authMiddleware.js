 const JWT = require('jsonwebtoken');

 //all the tokens like things are in req's header while others are in body
 module.exports = async (req,res,next) =>{
    try{
        const token = req.headers['authorization'].split(" ")[1]
    JWT.verify(token,process.env.JWT_SECRET,(err,decode)=>{
         if(err){
            return res.status(200).send({
                message:'Auth failed',
                success:false
            })
         }else{
            req.body.userId = decode.id
            next()
         }
    })
    }catch(error){
        console.log(error);
        res.status(401).send({
            message:"auth failed",
            success:false,
        });
    }
 };