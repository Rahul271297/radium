const validation = async function(req,res,next){
    let freeApp = req.headers.isfreeapp
    //console.log(freeApp)
    //console.log(req.headers)
    if (freeApp){
        req['isFreeAppUser']= freeApp
        next();
    }else{
        res.send({msg:"The request is missing a mandatory header"})
    }
}
module.exports={validation}