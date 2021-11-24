const ProductModel= require("../models/productModel.js")

const createProduct= async function (req, res) {
    var data= req.body
    // console.log(data)
   // let freeApp = req.body.
    let savedData= await ProductModel.create(data)
   // console.log(savedData)
    res.send({msg: savedData})    
}

module.exports={createProduct}
