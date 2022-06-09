const authorModel = require("../models/authorModel")
const bookModel= require("../models/bookModel")
const publisherModel= require("../models/publisherModel")
const createBook= async function (req, res) {
    let book = req.body
   if(!req.body.author_id) {
    res.send({msg: "author_id is required"})
   }
   else if(!authorModel.find(req.body.author_id)) {
  res.send ({msg: "author is not present with this id"})
   }
    else if(!req.body.publisher_id){
     res.send({msg: "publisher_id is required"})  
   }
   else if(!publisherModel.find(req.body.publisher_id)) {
    res.send({msg: "publisher is not present with this id"})
   }
     else { let bookCreated = await bookModel.create(book)
        res.send({data: bookCreated})
    }
 }  

module.exports.createBook= createBook

const getBooksWithcompleteDetails = async function (req, res) {
    let specificBook = await bookModel.find().populate('author_id','publisher_id')
    res.send({data: specificBook})

}

module.exports.getBooksWithcompleteDetails= getBooksWithcompleteDetails
