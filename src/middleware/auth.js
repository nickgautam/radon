const jwt = require("jsonwebtoken");

const authenticationMid1 = function ( req, res, next) {

 if(!req.headers["x-auth-token"]) return res.send({ status: false, msg: "token must be present" })
 

 let token = req.headers["x-auth-token"];
    let decodedToken = jwt.verify(token, "functionup-radon");
  console.log(decodedToken)
 
  if(!(decodedToken.batch=="Radon"))                         
    return res.send({ status: false, msg: "token is invalid" });
 
 next()
}

module.exports.authenticationMid1 = authenticationMid1   

const authorisationMid2= function ( req, res, next) {
    let token = req.headers["x-auth-token"];
    let decodedToken = jwt.verify(token, "functionup-radon");

    if(!(decodedToken.userId==req.params.userId))                          
    return res.send({ status: false, msg: "you are not authorised to fetch and modified other's data" });
 

    next()   
   }
   
   module.exports.authorisationMid2 = authorisationMid2   