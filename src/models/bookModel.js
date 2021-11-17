const mongoose=require('mongoose')
const  bookSchema = new mongoose.Schema({
    bookName :{
        type : String,
        required : true
    },
    price : {
        IndianPrice :String,
        EuroPrice :String

    },
    year :{ 
        type : Number,
        default : 2021
    },
    tags : [String],
    authorName : String,
    category : String,
    totalPages : Number,
    stockAvailable : Boolean
    
}, {timestamps: true}) 

module.exports=mongoose.model('Book', bookSchema)