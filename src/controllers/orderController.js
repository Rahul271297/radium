// const OrderModel= require("../models/orderModel.js")
// const UserModel= require("../models/orderModel.js")
// const ProductModel= require("../models/orderModel.js")


// const createOrder= async function (req, res) {
//    let userId = req.body.userId;
//    let productId = req.body.productId;
//    let userValidation = await UserModel.findById(userid)
//    let productValidation = await ProductModel.findById(productId)
//    if(userValidation && productValidation ){
//       let freeAppUser = userValidation.freeAppUser
//       let userBalance= userValidation.balance
//       if(freeAppUser==false){
//          let bookPrice = productValidation.price

//       }else{
//         let  orderDetail =req.body
//         orderDetail.amount = 0
//         orderDetail.isFreeAppUser = freeAppUser
//       }
       
//    }else{
//       res.send=({msg:"Id's are not valid"})
//    }


      
// }

// module.exports={createOrder}