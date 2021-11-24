const jwt = require('jsonwebtoken')
const UserController= require("../controllers/userController")
const validation = async function(req,res,next){
    let token = req.headers['x-auth-token']
    if(token){
        let validToken = jwt.verify(token, 'mysecretkey')
        console.log(validToken)
         
        if(validToken){
            let validTokenId = validToken["_id"]
            let userId = req.params.userId
  
 
            if(validTokenId==userId){

            next()
            }else{
                res.send({msg:'not matching'})
            }
        }else{
            res.send({msg:'not a valid token'})
        }
        next
    }else{
        res.send({msg:' token missing'})
    }
}
module.exports={validation}