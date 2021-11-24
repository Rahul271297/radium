const OrderModel= require("../models/orderModel.js")
const UserModel= require("../models/orderModel.js")
const ProductModel= require("../models/orderModel.js")


const createOrder = async function (req, res) {

    let userid = req.body.userId
    let productid = req.body.productId
    let userValidation = await UserModel.findById(userid)
    let productValidation = await ProductModel.findById(productid)


    if (userValidation) {  //checking user is present or not.

        if (productValidation) { //checking product is present or not.

            let freeAppUser = req.isFreeAppUser
            let userBalance = userValidation.balance

            if (freeAppUser === false) { // checking user is freeAppUser or not.

                let bookPrice = productValidation.price
                if (userBalance >= bookPrice) {  // user has sufficient balance to make order or not.

                    let orderDetail = req.body              //User is not a freeAppUser
                    orderDetail.amount = bookPrice
                    orderDetail.isFreeAppUser = freeAppUser
                    orderDetail.date = new Date()
                    let updatedBalance = userBalance - bookPrice
                    let data1 = await OrderModel.create(orderDetail)               //creating order
                    await UserModel.findOneAndUpdate({ "_id": userid }, { "balance": updatedBalance })    // updating the balance of user after order
                    res.send({ "Order Placed ": data1 })

                } else {

                    res.send({ msg: "Low Balance, load balance first" })      // insufficient balace available

                }

            } else {                                                   //User is a freeAppUser

                let orderDetail = req.body
                orderDetail.amount = 0
                orderDetail.isFreeAppUser = freeAppUser
                orderDetail.date = new Date()
                let data1 = await OrderModel.create(orderDetail)       //creating order
                res.send({ "Order Placed ": data1 })

            }

        } else {

            res.send({ msg: "Product does not exist or productId is missing" })
        }

    } else {

        res.send({ msg: "User does not exist or UserId is missing" })
    }


}
module.exports.createOrder=createOrder