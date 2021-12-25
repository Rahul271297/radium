const BlogModel = require('../models/blogModel.js')
const AuthorModel = require('../models/authorModel.js')
const mongoose = require('mongoose')
const ObjectId = mongoose.Types.ObjectId


// For Validation criteria
const isValid = function(value){ //(this is for validating weather the parameter's value is correct or is present or not)
  if(typeof value === 'undefined' || value === null) return false
  if(typeof value === 'string' && value .trim().length === 0) return false
  return true
}

const isValidRequestBody = function(requestBody){ //()
  return Object.keys(requestBody).length > 0
}

const isValidObjectId = function(objectId){
  return ObjectId.isValid(objectId)
}

const createBook = async function (req,res){
  try{
  const requestBody = req.body 
  
  if(!isValidRequestBody(requestBody)) {
    return res.status(400).send({status:false,msg:"Please provide parameters"})
  }   
  let {title,body,authorId,tags,category,subcategory,isPublished} = requestBody
  // validation starts
  if(!isValid(title)){
    return res.status(400).send({status:false,msg:"Title is required"})
  }
  if(!isValid(body)){
    return res.status(400).send({status:false,msg:"Body is required"})
  }
  if(!isValid(authorId)){
    return res.status(400).send({status:false,msg:"AuthorId is required"})
  }
  if(!isValidObjectId(authorId)){
    return res.status(400).send({status:false,msg:"Valid AuthorId is required"})
  }
 
  if(!isValid(category)){
    return res.status(400).send({status:false,msg:"Category is required"})
  }
  const author = await AuthorModel.findById(authorId)
  console.log(author)
  if(!author){
   return res.status(400).send({status : false , msg : 'Author does not exsist'})
  }
  const blogData = {
    title,
    body,
    authorId,
    category,
    isPublished : isPublished?isPublished:false, // if the condition is true it will 
    publishedAt : isPublished? new Date(): null  // return isPublished otherwise false
  }
  if(tags){
    if(Array.isArray(tags)){ // Array.isArray(value)- here if the value is an array it will return true
      blogData['tags'] = [...tags]
    }
    if(Object.prototype.toString.call(tags) === '[object Array]') // coverting an array into string of array
    blogData['tags'] = [...tags]
  }
  if(subcategory){
    if(Array.isArray(subcategory)){ // Array.isArray(value)- here if the value is an array it will return true
      blogData['subcategory'] = [...subcategory]
    }
    if(Object.prototype.toString.call(subcategory) === '[object Array]')
    blogData['subcategory'] = [...subcategory]
  }
  const newData = await BlogModel.create(blogData)
  return res.status(201).send({status:true,data:newData})
  }catch(error){
    console.log(error)
    return res.status(500).send("status:false,message:error")
  }
}

//*******************************List of Blog ***************//
const listBlog = async function(req,res){
  try{
    const filterQuery = {isDeleted:false,isPublished:true}
    const queryParams = req.query
    if(isValid(queryParams)){
      const {authorId,category,tags,subcategory} = queryParams
    
    if(isValid(authorId) && isValidObjectId(authorId) ){
      filterQuery['authorId'] =authorId
      //object['inserting newKey'] = value of the key
    }
  if(isValid(category)){
    filterQuery['category'] = authorId
  }
  if(isValid(tags)){
    filterQuery['tags'] = category
  }
  if(isValid(subcategory)){
    filterQuery['subcategory'] = tags
  }
}
  const getBlog = await BlogModel.find(filterQuery);
  console.log(getBlog)
  if(Array.isArray(getBlog) && getBlog.length === 0){
    res.status(400).send({status:false,msg:"Blog not found"})
  }else{
    res.status(200).send({status:true,data:getBlog})
  }
  }catch(error){
    console.log(error)
   res.status(500).send({status:false,msg:error.message})
  }
}
//***********************Update Blog*********************
const updateBlog = async function(req,res){
  try{
    const id = req.params.blogId
    const requestBody = req.body;
    const aurthorToken = req.decodedToken.userId
    console.log(aurthorToken)
    if(!isValidRequestBody(requestBody)){
      res.status(400).send({status:false,msg:"Parameters required"})
    }
    let blogDetail = await BlogModel.findOne({_id:id,isDeleted:false})   
    if(!blogDetail){
      res.status(400).send({status:false,msg:"Blog does not exsist"})
    }
   if(!(aurthorToken ==  blogDetail.authorId)){
     return res.status(401).send({status:false,msg:"Not authorized"})
   }
    let {title,body,category,isPublished,tags,subcategory} = requestBody
    if(isPublished){
     let upDatedValue = await BlogModel.findOneAndUpdate({_id : id , isDeleted : false},{
       $set:
       {
         tilte:title,
         body:body,
         category:category,
         isPublished:isPublished,
         publishedAt : Date.now()
         
       },
       $push:
       {
         tags:tags,
         subcategory:subcategory
       }
     },{new:true})
     res.status(200).send({status:true,data:upDatedValue})
    }else{
      let upDatedValue = await BlogModel.findOneAndUpdate({_id : id , isDeleted : false},{
        $set:
        {
          tilte:title,
          body:body,
          category:category,
          // isPublished:isPublished,
          // publishedAt : Date.now()
          
        },
        $push:
        {
          tags:tags,
          subcategory:subcategory
        }
      },{new:true})
      res.status(200).send({status:true,data:upDatedValue})
    }
  

  }catch(error){
    res.status(500).send({status:false,msg:error.message})

  }
}
/********************************* */

    const deletedData = async function(req,res){
      try{
      const id = req.params.blogId
      const aurthorToken = req.decodedToken.userId
      const blog = await BlogModel.findOne({_id:id,isDeleted:false})
      if(!blog){
        res.status(404).send({status:false,msg:"Blog not Found"})
      }
      if(!(aurthorToken == blog.authorId)){
        return res.status(401).send({status:false,msg:"Not authorized"})
      }
      const deleteData = await BlogModel.findOneAndUpdate({_id:id},{isDeleted:true,deletedAt:Date.now()},{new:true})
      res.status(200).send({status:true,msg:'Successfully Data Deleted'})
      }catch(error){
        res.status(500).send({status:false,msg:error.message})
      }
    }
    /**********************Delete By query *//**************** */
    const deleteDataByQuery = async function(req,res){
      try{
        const requestQuery = req.query
        const aurthorToken = req.decodedToken.userId
        if(!isValidRequestBody(requestQuery)){
          res.status(400).send({status:false,msg:"Parameters are required"})
        }
        let {category, authorId, tags, subcategory} = requestQuery
        let obj = {isDeleted:false,authorId:aurthorToken}
       if(category){
         obj.category = category
       }
       if(authorId){
         obj.authorId = authorId
       }
       if(tags){
         obj.tags = tags
       }
       if(subcategory){
         obj.subcategory = subcategory 
       }
       if(!(aurthorToken == authorId)){
        return res.status(401).send({status:false,msg:"Not authorized"})
      }
      
      const deletedObj = await BlogModel.findOneAndUpdate(obj,{isDeleted:true,deletedAt:Date.now()},{new:true})
      if(!deletedObj){
      return  res.status(404).send({status:false,msg:'No Blog Found'})
      }
      res.status(200).send({status:true,msg:'Successfully Data Deleted',data:deletedObj})

      }catch(error){
        res.status(500).send({status:false,msg:error.message})
      }
    }
module.exports={createBook,listBlog,updateBlog,deletedData,deleteDataByQuery}



