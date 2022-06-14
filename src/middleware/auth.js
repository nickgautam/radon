const userController = require("../controllers/userController");
const jwt = require("jsonwebtoken");

const mid1= function ( req, res, next) {

 if(!req.headers["x-auth-token"]) return res.send({ status: false, msg: "token must be present" })
 next()
}

module.exports.mid1= mid1   

const mid2= function ( req, res, next) {
    let token = req.headers["x-auth-token"];
    let decodedToken = jwt.verify(token, "functionup-radon");
  //console.log(decodedToken)
 
  if(!(decodedToken.userId==req.params.userId))                 
    return res.send({ status: false, msg: "token is invalid" });

    next()
   }
   
   module.exports.mid2= mid2   