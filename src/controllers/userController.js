const UserModel = require("../models/userModel.js")
const jwt = require('jsonwebtoken')
const registerUser = async function (req, res) {
    var userdata = req.body
    let savedData = await UserModel.create(userdata)
    res.send({ status: true, data: savedData })
}


const logIn = async function (req, res) {
    const userdata = req.body
    console.log(userdata)
    const userdetails = await UserModel.findOne(userdata)
    if (userdetails) {
        let userValidation = userdetails.isDeleted
        if (userValidation == false) {
            let payload = { _id: userdetails._id }
            let tokenGenerated = jwt.sign(payload, 'mysecretkey')
            res.send({ status: true, data: payload, token: tokenGenerated })
        } else {
            res.send({ status: false, msg: "User invalid" })
        }
    } else {
        res.send({ msg: "no data present" })
    }


}

const userdetails1 = async function (req, res) {
    let userId = req.params.userId



    let userDetails = await UserModel.findOne({ "_id": userId, isDeleted: false })

    if (userDetails) {
        res.send({ status: true, data: userDetails })
    } else {
        res.send({ status: false, msg: 'User not found' })
    }


}



const updateUser = async function (req, res) {
    let userId = req.params.userId
    let userEmail = req.body.email




    let updatedMail = await UserModel.findOneAndUpdate({ "_id": userId }, { email: userEmail }, { new: true })
    res.send({ status: true, data: updatedMail })



}





module.exports = { registerUser, logIn, userdetails1, updateUser }
