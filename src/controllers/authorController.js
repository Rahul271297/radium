const AuthorModel = require('../models/authorModel.js')
const jwt = require('jsonwebtoken')

const isValid = function(value) {
    if (typeof value === 'undefined' || value === null) return false
    if (typeof value === 'string' && value.trim().length === 0) return false
    return true;
}// Here we are validating the credentials are valid or not
const isValidTitle = function(title) {
    return ['Mr', 'Mrs', 'Miss'].indexOf(title) !== -1
}
const isValidRequestBody = function(requestBody) {
    return Object.keys(requestBody).length > 0
}

const createAuthor = async function(req,res){
    try{
        const requestBody = req.body;
        if(!isValidRequestBody(requestBody)){
            res.status(400).send({status:false,msg:"Parameters are required,body should not be empty"})

        }
        const {fname,lname,title,email,password}= requestBody
        if(!isValid(fname)){
            res.status(400).send({status:false,msg:'First name is required'})
        }
        if(!isValid(lname)){
            res.status(400).send({status:false,msg:'last name is required'})
        }
        if(!isValid(title)){
            res.status(400).send({status:false,msg:'Title is required'})
        }
        if(!isValidTitle(title)){
            res.status(400).send({status:false,msg: "Invalid title"})
        }
        if(!isValid(email)){
            res.status(400).send({status:false,msg:'Email is required'})
        }
        if (!(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email.split(' ').join('')))) {
            res.status(400).send({ status: false, message: `Email should be a valid email address` })
            return
        }
        if(!isValid(password)){
            res.status(400).send({status:false,msg:'Password is required'})
        }
        let Email = email.split(' ').join('')
        let isEmailAlreadyUsed = await AuthorModel.findOne({email:Email})
        if(isEmailAlreadyUsed){
            return res.status(400).send({status:false,msg:'Email is already used'})
        }
        const savedData = {fname,lname,title,email,password}
        const authorData = await AuthorModel.create(savedData)
        return res.status(201).send({status:true,msg:'Author successfully created',data:authorData})
    }catch(error){
        console.log(error)
        res.status(500).send({ status: false, Message: error.message })

    }
}

const login = async function (req,res){
   try{
       let requestBody = req.body
       if(!isValidRequestBody(requestBody)){
           res.status(400).send({status:false,msg:"Parameters are required"})
       }
       let useremail = requestBody.email
       let userpassword = requestBody.password
       if(!isValid(useremail)){
        res.status(400).send({status:false,msg:"Email is required"})
       }
       
       if(!isValid(userpassword)){
        res.status(400).send({status:false,msg:"Password is required"})
       }
     let User =  await AuthorModel.findOne({email:useremail,password:userpassword,isDeleted:false})
      if(User){
          const Token = jwt.sign({userId:User._id},"Jstar")
          res.header('x-api-key',Token)
          res.status(200).send({status:true,data:Token})
      }else{
          res.status(401).send({status:false,msg:"Invalid Password or Email"})
      }
   }catch(error){
       res.status(500).send({status:false,msg:error.message})

   }


}
module.exports={createAuthor,login}