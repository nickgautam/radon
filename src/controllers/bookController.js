const { count } = require("console")
const bookModel= require("../models/bookModel")


const createBook= async function (req, res) {
    let data= req.body
if(req.body.author_id){
    let savedData= await bookModel.create(data)
    res.send({msg: savedData})

} else {

    res.send({msg: "please enter author_id"}) 
 }

}

module.exports.createBook= createBook

//const getBooksData= async function (req, res) {
    //let allBooks= await BookModel.find( {authorName : "HO" } )
    //console.log(allBooks)
    //if (allBooks.length > 0 )  res.send({msg: allBooks, condition: true})
//}


//const updateBooks= async function (req, res) {
    //let data = req.body // {sales: "1200"}
    // let allBooks= await BookModel.updateMany( 
    //     { author: "SK"} , //condition
    //     { $set: data } //update in data
    //  )
    //let allBooks= await BookModel.findOneAndUpdate( 
        //{ authorName: "ABC"} , //condition
        //{ $set: data }, //update in data
        //{ new: true , upsert: true} ,// new: true - will give you back the updated document // Upsert: it finds and updates the document but if the doc is not found(i.e it does not exist) then it creates a new document i.e UPdate Or inSERT  
     //)
     
     //res.send( { msg: allBooks})
//}

//const deleteBooks= async function (req, res) {
    // let data = req.body 
    //let allBooks= await BookModel.updateMany( 
        //{ authorName: "FI"} , //condition
        //{ $set: {isDeleted: true} }, //update in data
        //{ new: true } ,
     //)
     
    // res.send( { msg: allBooks})
//}







