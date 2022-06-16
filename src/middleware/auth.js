const userModel = require("../models/userModel");
const jwt = require("jsonwebtoken");

const authenticationMid1 = async function ( req, res, next) {
 try{
  
    let userId = req.params.userId;
    let userDetails = await userModel.findById(userId);
    if (!userDetails)
      return res.status(404).send({ status: false, msg: "No such user exists" });


 let token = req.headers["x-auth-token"];
 if(!token) return res.status(400).send({status: true, msg: "token must be present" })
   
 let decodedToken = jwt.verify(token, "functionup-radon");
  console.log(decodedToken)
    

}catch(err){res.status(500).send({msg:err.message})}
 next()
}

module.exports.authenticationMid1 = authenticationMid1   

const authorisationMid2= function ( req, res, next) {
    
  let token = req.headers["x-auth-token"];
    let decodedToken = jwt.verify(token, "functionup-radon");
try{
    if(!(decodedToken.userId==req.params.userId))                          
    return res.status(403).send({ status: false, msg: "you are not authorised to fetch and modified other's data" });
 
    
   }catch(err){ res.status(500).send({msg:"Server error" , msg:err.message})} 
   next()  
  }
   
   module.exports.authorisationMid2 = authorisationMid2   