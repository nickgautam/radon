const express = require('express');
const _ = require('lodash');
const myHelper = require('../util/helper')
const underscore = require('underscore')

const router = express.Router();
router.get('/test-me', function (req, res) {
    myHelper.printDate()
    myHelper.getCurrentMonth()
    myHelper.getCohortData()
    let firstElement = underscore.first(['Nishant','Sabiha','Akash','Pritesh'])
    console.log('The first element received from underscope function is '+firstElement)
    res.send('My first ever api!')
});

router.get('/hello', function (req, res) {
   // array to be reduced
const array = ['jan', 'feb', 'mar', 'apr', 'may', 'june', 'july', 'aug', 'sep', 'oct', 'nov', 'dec'];

// size of chunk
const size = 3;

// create array of chunks
const result = _.chunk(array, size);

// print result on console
console.log(result);

const Array2 = [1, 3, 5, 7, 9, 11, 13, 15, 17, 19]
const ans= _.tail(Array2);
console.log(ans);

var a = [34, 35, 40, 48, 49];
var b = [30, 35, 45, 48, 49];
var c = [34, 35, 44, 48, 46];
var d = [34, 35, 45, 48, 49];
var e = [48, 55];
var union = [...new Set([...a, ...b, ...c, ...d, ...e])];
console.log(union);


// The array3 to be queried
const array3 = [['horror', 'The Shining'],['drama', 'Titanic'],['thriller', 'Shutter Island'],['fantasy', 'Pans Labyrinth']];

// Creating the object using key-value pairs
const output = _.fromPairs(array3);

// Printing the output to the console
console.log(output);


    res.send('Hello there!')
});

router.get('/candidates', function(req, res){
    console.log('Query paramters for this request are '+JSON.stringify(req.query))
    let gender = req.query.gender
    let state = req.query.state
    let district = req.query.district
    console.log('State is '+state)
    console.log('Gender is '+gender)
    console.log('District is '+district)
    let candidates = ['Akash','Suman']
    res.send(candidates)
})

router.get('/candidates/:canidatesName', function(req, res){
    console.log('The request objects is '+ JSON.stringify(req.params))
    console.log('Candidates name is '+req.params.canidatesName)
    res.send('Done')
})


module.exports = router;
// adding this comment for no reason