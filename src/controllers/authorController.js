const authorModel= require("../models/authorModel");
const bookModel= require("../models/bookModel");
const createAuthor= async function (req, res) {
    let data= req.body
    if(req.body.author_id) {
    let savedData= await authorModel.create(data)
    res.send({msg: savedData})

} else {

   res.send({msg: "please enter author_id"}) 
}
}
module.exports.createAuthor= createAuthor

const listOutBooks= async function (req ,res){
let id = await authorModel.find({author_name:"Chetan Bhagat"}).select({author_id:1, _id:0})
let getListOfBooks= await bookModel.find(id[0]).select({name:1, _id:0})
res.send({msg: getListOfBooks})
}
 
module.exports.listOutBooks= listOutBooks

const authorOfTwoStates= async function(req, res){
    let result= await bookModel.findOneAndUpdate({name:"Two states"},{$set: {price:100}}, {new: true}).select({author_id:1, price:1, _id:0})
    let a= await authorModel.find({author_id: result.author_id}).select({author_name:1, _id:0})
   console.log(result)
    res.send({msg: a, result})
}
module.exports.authorOfTwoStates= authorOfTwoStates

const bookByCost= async function(req, res){
    let bookresult= await bookModel.find({price:{$gte:50, $lte:100}}).select({author_id:1, price:1, name:1, _id:0})
  
    let b= await authorModel.find({bookresult}).select({author_name:1, author_id:1, _id:0})
   
  let c= b.concat(bookresult)

res.send({msg: c})

}

module.exports.bookByCost= bookByCost
