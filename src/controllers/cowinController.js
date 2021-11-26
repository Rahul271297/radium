const axios = require("axios");
const express = require('express');


// res.status(200). send( { data: userDetails } )

const getStatesList = async function (req, res) {
  try {
    let options = {
      method: "get",
      url: "https://cdn-api.co-vin.in/api/v2/admin/location/states",
    };
    const cowinStates = await axios(options);

    console.log("WORKING");
    let states = cowinStates.data;
    res.status(200).send({ msg: "Successfully fetched data", data: states });

  } 
  catch (err) {
    console.log(err.message);
    res.status(500).send({ msg: "Some error occured" });
  }

};


const getDistrictsList = async function (req, res){

    try{ 
        let id= req.params.stateId
        console.log(" state: ", id)

        let options = {
            method: "get",
            url : `https://cdn-api.co-vin.in/api/v2/admin/location/districts/${id}` //plz take 5 mins to revise template literals here
        }
        let response= await axios(options)

        let districts= response.data
        
        console.log(response.data)
        res.status(200).send( {msg: "Success", data: districts} )

    }
    catch(err) {
        console.log(err.message)
        res.status(500).send( { msg: "Something went wrong" } )
    }
}

const getByPin = async function (req, res){

    try{ 

        let pin= req.query.pincode
        let date= req.query.date

        let options = {
          method : "get",
          url : `https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/findByPin?pincode=${pin}&date=${date}`
        }
        let response= await axios(options)
        


        let centers= response.data
        console.log(centers)
        res.status(200).send( {msg: "Success", data: centers} )

    }
    catch(err) {
        console.log(err.message)
        res.status(500).send( { msg: "Something went wrong" } )
    }
}


const getOtp = async function (req, res){

    try{ 

         let options = {
          method : "post", // method has to be post
          url : `https://cdn-api.co-vin.in/api/v2/auth/public/generateOTP`,
          data: { "mobile": req.body.mobile  } // we are sending the json body in the data 
        }
        let response= await axios(options)

        let id= response.data
        res.status(200).send( {msg: "Success", data: id} )

    }
    catch(err) {
        console.log(err.message)
        res.status(500).send( { msg: "Something went wrong" } )
    }
}

const weatherInfo = async function(req,res){
  try{
  let place = req.params.q
  let id = req.params.appid
  
  let options = {
    method : "get",
    url : `http://api.openweathermap.org/data/2.5/weather?q=London&appid=5ae79ae59510c9909df775fe23856ae6`
  }
  let response= await axios(options)
  console.log (response)
 let id1 = response.data.main
 res.status(200).send({msg:"Successfully fetched data",data:id1})
  }
 catch(err){
   res.status(500).send({msg:"Some error"})
 }
}
const weatherInfoOfLondon = async function(req,res){
  console.log("hii")
  try{
  let place = req.query.q
  console.log(place)
  let id = req.query.appid
  console.log(id)

  
  let options = {
    method : "get",
    url : `http://api.openweathermap.org/data/2.5/weather?q=${place}&appid=${id}`
  }
  
  let response= await axios(options)
  console.log (response)
 let id1 = response.data.main.temp
 res.status(200).send({msg:"Successfully fetched data",temp:id1})
  }
 catch(err){
   console.log(err)
   res.status(500).send({msg:"Some error"})
 }
}
 const sortCities = async function(req,res){
   try{
     let city =  ["Bengaluru","Mumbai", "Delhi", "Kolkata", "Chennai", "London", "Moscow"] 
     let arr = [];
     for(i=0;i<city.length;i++){
      let options = {
        method : "get",
        url : `http://api.openweathermap.org/data/2.5/weather?q=${city[i]}&appid=5ae79ae59510c9909df775fe23856ae6`
      }
      let response= await axios(options)
       arr.push({"city":city[i],"temp":response.data.main.temp})
     }
     let cities = arr.sort(function(a,b) {return parseFloat(a.temp)-parseFloat(b.temp)});
     res.status(200).send({msg : "Successfully fetched data","temp_increasing_order":cities})
   }
   catch(err){
       console.log(err)
        res.status(500).send({msg:"something went wrong"})
   }
 }


module.exports.getStatesList = getStatesList;
module.exports.getDistrictsList = getDistrictsList;
module.exports.getByPin = getByPin;
module.exports.getOtp = getOtp;
module.exports.weatherInfo= weatherInfo;
module.exports.weatherInfoOfLondon= weatherInfoOfLondon;
module.exports.sortCities= sortCities;