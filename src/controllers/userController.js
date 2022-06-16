const jwt = require("jsonwebtoken");
const userModel = require("../models/userModel");

const createUser = async function (req, res) {
  //You can name the req, res objects anything.
  //but the first parameter is always the request 
  //the second parameter is always the response
  try{

    let data = req.body;
    if(!data.mobile) return res.status(400).send({status: false, msg: "Mobile no is required"})
  let savedData = await userModel.create(data);
  //console.log(req.newAtribute);
  
  res.status(201).send({ status: true , msg: "user is successfully created." , data: savedData });
}
catch(err){res.status(500).send({msg: err.message})}}


const loginUser = async function (req, res) {
  let userName = req.body.emailId;
  let password = req.body.password;
try{
  if(!(userName && password))return res.status(401).send({msg: "please login first"})
  let user = await userModel.findOne({ emailId: userName, password: password });
  if (!user)
    return res.status(400).send({
      status: false,
      msg: "username or the password is not correct",
    });
  
  // Once the login is successful, create the jwt token with sign function
  // Sign function has 2 inputs:
  // Input 1 is the payload or the object containing data to be set in token
  // The decision about what data to put in token depends on the business requirement
  // Input 2 is the secret
  // The same secret will be used to decode tokens
  let token = jwt.sign(
    {
      userId: user._id.toString(),
      batch: "Radon",
      organisation: "FunctionUp",
    },
    "functionup-radon"
  );
  res.setHeader("x-auth-token", token);
  res.send({ status: true, token: token });
}catch(err){
  res.status(500).send({msg: err.message })
}
};


  //let token = req.headers["x-auth-token"];
  //if (!token) token = req.headers["x-auth-token"];

  //If no token is present in the request header return error
  //if (!token) return res.send({ status: false, msg: "token must be present" });

  //console.log(token);  
  
  // If a token is present then decode the token with verify function
  // verify takes two inputs:
  // Input 1 is the token to be decoded
  // Input 2 is the same secret with which the token was generated
  // Check the value of the decoded token yourself        
  //let decodedToken = jwt.verify(token, "functionup-radon");
  //console.log(decodedToken)      
 
  //if(!(decodedToken.userId==req.params.userId))                 
    //return res.send({ status: false, msg: "token is invalid" });


    const getUserData = async function (req, res) {
  let userId = req.params.userId;
  let userDetails = await userModel.findById(userId);

  res.send({ status: true, data: userDetails });
};

const updateUser = async function (req, res) {
// Do the same steps here:
// Check if the token is present
// Check if the token present is a valid token
// Return a different error message in both these cases

  let userId = req.params.userId;
  let userData = req.body;
  try{
  let updatedUser = await userModel.findOneAndUpdate({ _id: userId }, userData);
  res.status(200).send({ status: true, data: updatedUser });
}catch(err){res.status(500).send({msg:err.message})}

};

const deleteUser = async function (req, res) {
try{
      let userId = req.params.userId;
      let user = await userModel.findById(userId);
      let markAttribute= await userModel.findOneAndUpdate({ _id: userId},{$set:{isDeleted:true}},{new: true , upsert:true});
      res.status(200).send({ status: true, data: markAttribute });
}catch(err){res.status(500).send({msg:err.message})}
    };


module.exports.createUser = createUser;
module.exports.getUserData = getUserData;
module.exports.updateUser = updateUser;
module.exports.loginUser = loginUser;
module.exports.deleteUser = deleteUser;
