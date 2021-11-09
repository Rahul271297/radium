const express = require('express');

const router = express.Router();

router.get('/test-me', function (req, res) {
    res.send('My first ever api!')
});

// router.get('/movies', function (req ,res){
//     res.send(["DDLJ","3 Idiots","Jungle"])
// })


module.exports = router;
router.get('/movies/:index', function (req ,res){
    let i = req.params.index
    const mov = ["DDLJ","3 Idiots","Jungle"];

    res.send(i>mov.length-1?" Use a valid index":mov[i])
})


router.get('/films', function (req ,res){
    const mov = [ {
        'id': '1',
        'name': 'The Shining'
       }, {
        'id': '2',
        'name': 'Incendies'
       }, {
        'id': '3',
        'name': 'Rang de Basanti'
       }, {
        'id': '4',
        'name': 'Finding Demo'
       }]
    res.send(mov)
 })

router.get('/films1/:filmid', function (req ,res){
    let i = req.params.filmid
    const mov = [ {
        id: '1',
        name: 'The Shining'
       }, {
        id: '2',
        name: 'Incendies'
       }, {
        id: '3',
        name: 'Rang de Basanti'
       }, {
        id: '4',
        name: 'Finding Demo'
       }]
       const film = mov.filter(x=> x.id==i)
           
    res.send(i>mov.length-1?'Not a valid id':film[0].name)
})

