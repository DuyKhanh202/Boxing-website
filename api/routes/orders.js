const express = require('express');
const router = express.Router();
const Order = require('../services/orders');
const Users = require('../services/users');
const helper = require('../helper');

router.post('/insert', async function(req, res, next) {
  try {
    userid=helper.protect(req.headers.authorization)
    const userinfo = await Users.getinfo(userid)
    if(userinfo.length>0){
      if(userinfo.isAdmin == 0 ){
        next("AUTH FAILED");
      }else{
        orderItems=JSON.stringify(req.body.orderItems)
        shippingAddress=JSON.stringify(req.body.shippingAddress)
        isDelivered=req.body.isDelivered?1:0
        isPaid=req.body.isPaid?1:0
        paymentMethod=req.body.paymentMethod
        shippingPrice=req.body.shippingPrice
        taxPrice=req.body.taxPrice
        totalPrice=req.body.totalPrice
        user=userid
        result =await Order.insert(orderItems,shippingAddress,isDelivered,isPaid,paymentMethod,shippingPrice,taxPrice,totalPrice,user);
        if (result){
          //req.id=result["id"]
          res.json({
            id:result["id"],
            orderItems:req.body.orderItems,
            shippingAddress:req.body.shippingAddress,
            isDelivered:req.body.isDelivered,
            isPaid:req.body.isPaid,
            paymentMethod:req.body.paymentMethod,
            shippingPrice:req.body.shippingPrice,
            taxPrice:req.body.taxPrice,
            totalPrice:req.body.totalPrice,
            user:userid,
          })
        }else{
          res.json(
            {

            }
          )
        }
      }
    }else{
      res.json({"err":"AUTH FAILED"});
    }
   
  } catch (err) {
    console.error(`Error: `, err.message);
    next(err);
  }
});

router.get('/getinfo', async function(req, res, next) {
  try {
    userid=helper.protect(req.headers.authorization)
    const userinfo = await Users.getinfo(userid)
    if(userinfo.length>0){
      if(userinfo.isAdmin == 0 ){
        next("AUTH FAILED");
      }else{
        result = await Order.getinfo(req.query.id);
        res.json({
          id:result["id"],
          orderItems:JSON.parse(result["orderItems"]),
          shippingAddress:JSON.parse(result["shippingAddress"]),
          isDelivered:result["isDelivered"],
          isPaid:result["isPaid"],
          paymentMethod:result["paymentMethod"],
          shippingPrice:result["shippingPrice"],
          taxPrice:result["taxPrice"],
          totalPrice:result["totalPrice"],
          user:result["user"],
        })
        
      }
    }else{
      res.json({"err":"AUTH FAILED"});
    }
   
  } catch (err) {
    console.error(`Error: `, err.message);
    next(err);
  }
});

router.get('/getlist', async function(req, res, next) {
  try {
    userid=helper.protect(req.headers.authorization)
    const userinfo = await Users.getinfo(userid)
    if(userinfo.length>0){
      if(userinfo.isAdmin == 0 ){
        next("AUTH FAILED");
      }else{
          res.json(await Order.getlist())
      }
    }else{
      res.json({"err":"AUTH FAILED"});
    }
   
  } catch (err) {
    console.error(`Error: `, err.message);
    next(err);
  }
});

module.exports = router;