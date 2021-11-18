const BookModel= require("../models/bookModel.js")

const newBookData = async function(req,res){
    var data = req.body
    let savedData = await BookModel.create(data)
    res.send({msg : data})
}

const getBookData = async function (req,res){
    let allBooks= await BookModel.find()
    res.send({msg : allBooks})
}


module.exports.newBookData = newBookData
module.exports.getBookData = getBookData