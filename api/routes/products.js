const express = require('express');
const router = express.Router();
const Products = require('../services/products');
const Users = require('../services/users');
const upload = require('./upload');
const helper = require('../helper');
router.get('/getlist', async function(req, res, next) {
  try {
    const intpage = Number(req.query.pageNumber) || 1;
    res.json(await Products.getlist(req.query.keyword,intpage));
  } catch (err) {
    console.error(`Error: `, err.message);
    next(err);
  }
});
router.get('/getlisttop', async function(req, res, next) {
  try {
    res.json(await Products.getlisttop());
  } catch (err) {
    console.error(`Error: `, err.message);
    next(err);
  }
});
router.get('/getinfo', async function(req, res, next) {
  try {
    res.json(await Products.getinfo(req.query.id));
  } catch (err) {
    console.error(`Error: `, err.message);
    next(err);
  }
});
router.get('/', async function(req, res, next) {
  try {
    res.json(await Products.getinfo(1));
  } catch (err) {
    console.error(`Error: `, err.message);
    next(err);
  }
});
router.post('/update', async function(req, res, next) {
  try {
    userid=helper.protect(req.headers.authorization)
    const userinfo = await Users.getinfo(userid)
    //console.log(userinfo)
    if(userinfo.length>0){
      if(userinfo.isAdmin == 0 ){
        //console.log("FAILED")
        next("AUTH FAILED");
      }else{
        id=req.body.id;
        pname=req.body.name;
        price=req.body.price;
        image=req.body.image;
        brand=req.body.brand;
        category=req.body.category;
        description=req.body.description;
        countInStock=req.body.countInStock;
        res.json(await Products.update(id,pname,price,image,brand,category,description,countInStock));
      }
    }else{
      res.json({"err":"AUTH FAILED"});
    }
  } catch (err) {
    console.error(`Error: `, err.message);
    next(err);
  }
});
router.post('/insert', async function(req, res, next) {
  try {
    userid=helper.protect(req.body.headers.Authorization)
    const userinfo = await Users.getinfo(userid)
   // console.log(userinfo)
    if(userinfo.length>0){
      if(userinfo.isAdmin == 0 ){
        //console.log("FAILED")
        next("AUTH FAILED");
      }else{
        pname=req.body.name||"Example";
        price=req.body.price||0;
        image=req.body.image||"uploads/1.jpg";
        brand=req.body.brand||"Example";
        category=req.body.category||"Example";
        description=req.body.description||"Example";
        countInStock=req.body.countInStock||"0";
        res.json(await Products.insert(pname,price,image,brand,category,description,countInStock));
      }
    }else{
      res.json({"err":"AUTH FAILED"});
    }
    
  } catch (err) {
    console.error(`Error: `, err.message);
    next(err);
  }
});
router.post('/remove',async function(req, res, next) {
  try {
    userid=helper.protect(req.body.headers.Authorization)
    const userinfo = await Users.getinfo(userid)
    if(userinfo.length>0){
      if(userinfo.isAdmin == 0 ){
        next("AUTH FAILED");
      }else{
        res.json(await Products.remove(req.query.id));
      }
    }else{
      res.json({"err":"AUTH FAILED"});
    }
    
  } catch (err) {
    console.error(`Error: `, err.message);
    next(err);
  }
});
router.post("/upload", upload.single("image"), (req, res) => {
  
  const file = req.file
  if (!file) {
    const error = new Error('Please upload a file')
    error.httpStatusCode = 400
    return next(error)
  }
  // console.log(req.file)
  // res.send(file.path)
  res.send(`uploads/${req.file.filename}`);
});
module.exports = router;