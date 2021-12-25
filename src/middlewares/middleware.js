const jwt = require('jsonwebtoken')

const auth = async function(req,res,next){
    try{

        let token=req.headers['x-api-key']
        if(!token){
            res.status(400).send({status:false,msg:"Not a valid token"})
        }else{
            let decodedToken = jwt.verify(token,"Jstar")
            if(decodedToken.length != 0){
                req.decodedToken = decodedToken;
                next();
            }else{
                res.status(404).send({status:false,msg:"No token Found"})
            }
        }

      

        
    }catch(error){
        res.status(500).send({status:false,msg:error.message})

    }
}
module.exports={auth}