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
const createBook =  async function (req,res){
    let book = req.body
    let savedData = await BookModel.create(book)
    res.send ({msg : book})
}
const bookList = async function(req,res){
    let book = await BookModel.find().select({bookName:1, authorName:1 , _id:0 })
    res.send({msg : book})
}
const getBooksInYear = async function (req,res){
    
    let savedData = await BookModel.find({year : req.body.year})
    res.send({msg : savedData})
}
const getParticularBooks = async function (req,res){
    let savedData = await BookModel.find(req.body)
    res.send({msg : savedData})
}
const getXINRBooks = async function (req,res){
    let savedData = await BookModel.find({'price.IndianPrice':{$in:["3000","3500"]}})
    res.send({msg : savedData})
}
const getRandomBooks = async function (req,res){
    let savedData = await BookModel.find({$or:[{stockAvailable:true} ,{totalPages:{$gt:500}}]})
    res.send({msg : savedData})
}


module.exports.createBook = createBook
module.exports.newBookData = newBookData
module.exports.getBookData = getBookData
module.exports.bookList = bookList
module.exports.getBooksInYear = getBooksInYear
module.exports.getParticularBooks = getParticularBooks
module.exports.getXINRBooks = getXINRBooks
module.exports.getRandomBooks = getRandomBooks