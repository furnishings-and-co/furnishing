const authRouter = require('express').Router();
const { getUserByToken } = require('../db');


authRouter.get('/', async(req, res, next)=> {
    console.log("api.auth",req.body)
    try {
      const user = await getUserByToken(req.headers.authorization)
      
      res.send(user)
    }
    catch(err){
      console.log(err)
    }
  });
  module.exports = authRouter;