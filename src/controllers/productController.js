const ProductModel= require("../models/productModel.js")

const createProduct= async function (req, res) {
    var data= req.body
    let savedData= await ProductModel.create(data)
    res.send({msg: savedData})    
}

module.exports={createProduct}
