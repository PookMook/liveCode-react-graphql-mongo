const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const Password = require('../models/user_password');

const verifCreds = async (args) => {
    try{
      let findProp = args.username? {username:args.username}:{email:args.email}
      const fetchedPassword = await Password.findOne(findProp).populate("users")
      if(!fetchedPassword){throw new Error("Password not found")}
      if(!await bcrypt.compare(args.password,fetchedPassword.password)){
        throw new Error("Password is incorrect");
      }
      return fetchedPassword
    }
    catch(err){
      throw err
    }
  }

module.exports = {
    loginMutation: async (args,{req,_}) => {

        //The resolver only logs the user + password in the req object
        const fetchedPassword = await verifCreds(args);
        
        //Add password to the req.created list + add users in the req.list
        req.created = {...req.created, user:fetchedPassword.users[0].id, password:fetchedPassword.id}
        req.user = {
          usersIds:fetchedPassword.users.map(user => user._id.toString()),
          passwordId:fetchedPassword.id,
          admin:fetchedPassword.users.filter(user => user.admin).length > 0 ? true : false,
        }
        req.isAuth = true;
    
        return populatePassword(fetchedPassword)
      },
      login: async (args, {_,res}) => {
        try{
          const fetchedPassword = await verifCreds(args);
          const payload = {
            usersIds:fetchedPassword.users.map(user => user._id.toString()),
            passwordId:fetchedPassword.id,
            admin:fetchedPassword.users.filter(user => user.admin).length > 0 ? true : false,
            session:true
          }
    
          const token = jwt.sign(
            payload,
            process.env.JWT_SECRET_SESSION
          )
          const tokenCookie = jwt.sign(
            payload,
            process.env.JWT_SECRET_SESSION_COOKIE
          )
    
          //All query are async, can't channel req to another resolver
          //req.user = payload;
          //console.log("setting cookie:",tokenCookie,process.env.HTTPS);
          res.cookie("graphQL-jwt",tokenCookie,{expires:0,httpOnly:true,secure:process.env.HTTPS === "true"})
    
          return {
            token:token,
            token_cookie:tokenCookie,
            password:populatePassword(fetchedPassword),
            users:fetchedPassword.users.map(populateUser)
          }
        }
        catch(err){
          throw err
        }
      }
}