const authorModel = require("../models/authorModel")
const bookModel= require("../models/bookModel")
const publisherModel= require("../models/publisherModel")
const createBook= async function (req, res) {
    let book = req.body
  
   if(!req.body.author_id) {
    res.send({msg: "author_id is required"})
   }
   let authorData=await authorModel.findById(req.body.author_id)
   if(!authorData) {
  res.send ({msg: "author is not present with this id"})       

   }
     if(!req.body.publisher_id){
     res.send({msg: "publisher_id is required"})      
   }
   let publisherData=await publisherModel.findById(req.body.publisher_id) 
    if(!publisherData) {
    res.send({msg: "publisher is not present with this id"})
   }
     else { let bookCreated = await bookModel.create(book)
        res.send({data: bookCreated})
    }
 }  

module.exports.createBook= createBook

const getBooksWithcompleteDetails = async function (req, res) {
    let specificBook = await bookModel.find().populate('author_id').populate('publisher_id')
    res.send({data: specificBook})

}

module.exports.getBooksWithcompleteDetails= getBooksWithcompleteDetails


const updateisHardCover = async function (req, res) {
  let getPublisherId= await publisherModel.find({"name":{$in:["Penguin" , "HarperCollins"]}}).select({_id:1})
  let updatedBook1 = await bookModel.updateMany({publisher_id:getPublisherId[0]},{ $set: { isHardCover: true} },{new: true})
  let updatedBook2 = await bookModel.updateMany({publisher_id:getPublisherId[1]},{ $set: { isHardCover: true} },{new: true})
  let result = await bookModel.find({$in:[{updatedBook1},{updatedBook2}]}).populate('publisher_id').select({name:1, publisher_id:1, isHardCover:1, _id:0})
  console.log(getPublisherId)
  res.send({data: result})
}  
module.exports.updateisHardCover= updateisHardCover   

const updateBookprice = async function (req, res) {
  let getAuthorId= await authorModel.find({"rating":{$gt:3.5}}).select({_id:1})
  let Book1 = await bookModel.updateMany({ author_id:getAuthorId[0] },{ $set: { price:+10} },{new: true})
  let  Book2 = await bookModel.updateMany({ author_id:getAuthorId[1] },{ $set: { price:+10} },{new: true})
  let  Book3 = await bookModel.updateMany({ author_id:getAuthorId[2] },{ $set: { price:+10} },{new: true})
  let output = await bookModel.find({$in:[{Book1},{Book2},{Book3}]}).populate('author_id').select({name:1, author_id:1, price:1, _id:0})
  console.log(getAuthorId)  
  res.send({data: output})
}
module.exports.updateBookprice= updateBookprice