const express = require('express');

const router = express.Router();

router.get('/test-me', function (req, res) {
    res.send('My first ever api!')
});
let players = [
    {"name": "manish",
    "dob": "1/1/1995",
    "gender": "male",
    "city": "jalandhar",
    "sports": [
    "swimming"
    ],
    "bookings": [
    ]
    

        
    },{
    "name": "Sandeep",
"dob": "1/1/1996",
"gender": "male",
"city": "Punjab",
"sports": [
"Hockey"
],
"bookings": [
]
},{
"name": "Rahul",
"dob": "1/1/1997",
"gender": "male",
"city": "Dhanbad",
"sports": [
"swimming"
],
"bookings": [
]
},
{
"name": "Dhiraj",
"dob": "1/1/1996",
"gender": "male",
"city": "Aamkura",
"sports": [
"swimming"
],
"bookings": [
]

}

]
router.post('/players-details', function (req, res) {
    let data = req.body
   
    const play = players.filter(x=> x.name == data.name)
    if(play.length>0 ){
        res.send({"msg" :"Player already exist"})
    }else{
        players.push(data)
        res.send({"msg" : players})
    }
    
});



//Assignment 2

router.post('/players/:playerName/bookings/:bookingId', function (req, res) {
 const playerName = req.params.playerName;
 const bookingId = req.params.bookingId;
 const bookingData = req.body;
 const newdata = players.find(x=> x.name == playerName)
 console.log(newdata)
 if(newdata){
 if(newdata.bookings.length!=0){
 const id = newdata.bookings.find(x=> x.bookingId == bookingId)
 if(id){
     res.send({"msg" : "Booking already exist"})
 }else{
    bookingData.bookingId = bookingId
    players[players.indexOf(newdata)].bookings.push(bookingData)
     res.send({"msg" : "Thank You for booking here",bookingData, players})
 }}else {
    bookingData.bookingId = bookingId
    players[players.indexOf(newdata)].bookings.push(bookingData)
     res.send({"msg" : "Thank You for booking here",bookingData, players})
 }
     
 }else{
     res.send({"msg" : "Player does not exist"})
 }


});




module.exports = router;