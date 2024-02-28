const db = require('./db');
const helper = require('../helper');
const config = require('../config')
async function insert(orderItems,shippingAddress,isDelivered,isPaid,paymentMethod,shippingPrice,taxPrice,totalPrice,user){
  const rows = await db.query(
    `Insert into orders (orderItems,shippingAddress,isDelivered,isPaid,paymentMethod,shippingPrice,taxPrice,totalPrice,user,createdAt) values ('${orderItems}','${shippingAddress}','${isDelivered}','${isPaid}','${paymentMethod}','${shippingPrice}','${taxPrice}','${totalPrice}','${user}',NOW())`
  );
  const rows1 = await db.query(
    `SELECT * FROM orders where user=${user} order by id desc limit 1`
  );
  const data = rows1[0]
  return data
}
async function getinfo(id){
  const rows = await db.query(
    `SELECT * FROM orders WHERE id=${id}`
  );
  return rows[0]

}
async function getlist(){

  const rows1 = await db.query(
    `SELECT A.*,B.email FROM orders A LEFT JOIN users B ON A.user=B.id order by A.id desc`
  );
  return rows1
}
async function getinfo(id){
  const rows = await db.query(
    `SELECT * FROM orders WHERE id=${id}`
  );
  return rows[0]

}
module.exports = {
  insert,getinfo,getlist
}