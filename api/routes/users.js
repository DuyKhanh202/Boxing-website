const express = require('express');
const router = express.Router();
const Users = require('../services/users');
const helper = require('../helper');

router.get('/getlist', async function(req, res, next) {
  try {
    res.json(await Users.getlist(req.query.page));
  } catch (err) {
    console.error(`Error `, err.message);
    next(err);
  }
});
router.get('/getinfo', async function(req, res, next) {
  try {
    res.json(await Users.getinfo(req.query.id));
  } catch (err) {
    console.error(`Error `, err.message);
    next(err);
  }
});
router.get('/getedit', async function(req, res, next) {
  try {
    res.json(await Users.getedit(req.query.id));
  } catch (err) {
    console.error(`Error `, err.message);
    next(err);
  }
});
router.post('/login', async function(req, res, next) {
  try {
    const user = await Users.login(req.body.email,req.body.password);
    if (user!=undefined){
      res.json(user);
    }else {
      res.status(401).json({"message":"Invalid email or password"});
      //throw new Error("Invalid email or password");
    }
    
  } catch (err) {
    console.error(`Error `, err.message);
    next(err);
  }
});
router.post('/update', async function(req, res, next) {
  try {
    userid=helper.protect(req.headers.authorization)
    const userinfo = await Users.getinfo(userid)
    if(userinfo.length>0){
      if(userinfo.isAdmin == 0 ){
        next("AUTH FAILED");
      }else{
        id=req.body.id;
        pname=req.body.name;
        isadmin=req.body.isAdmin==true?1:0;
        res.json(await Users.update(id,pname,isadmin));
      }
    }else{
      res.json({"err":"AUTH FAILED"});
    }
  } catch (err) {
    console.error(`Error: `, err.message);
    next(err);
  }
});
router.post('/remove', async function(req, res, next) {
  try {
    userid=helper.protect(req.body.headers.Authorization)
    const userinfo = await Users.getinfo(userid)
    if(userinfo.length>0){
      if(userinfo.isAdmin == 0 ){
        next("AUTH FAILED");
      }else{
        res.json(await Users.remove(req.query.id));
      }
    }else{
      res.json({"err":"AUTH FAILED"});
    }
    
  } catch (err) {
    console.error(`Error: `, err.message);
    next(err);
  }
});
router.post('/register', async function(req, res, next) {

  try {
    userExists = await Users.getexist(req.body.email);
    if (userExists) {
      res.status(404);
      throw new Error("User already exists");
    }else{
       await Users.insert(req.body.name,req.body.email,req.body.password);
       const user = await Users.login(req.body.email,req.body.password);
       if (user!=undefined){
         res.json(user);
       }else {
         res.status(401).json({"message":"Invalid email or password"});
         //throw new Error("Invalid email or password");
       }
    }
  
  } catch (err) {
    console.error(`Error `, err.message);
    next(err);
  }
});

module.exports = router;