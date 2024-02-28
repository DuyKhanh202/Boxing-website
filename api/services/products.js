const db = require('./db');
const helper = require('../helper');
const config = require('../config');

async function getlist(keyword,intpage = 1){
  const where = keyword ? ` AND name like '%${keyword}%'`:""
  const offset = helper.getOffset(intpage, config.listPerPage);
  const rows = await db.query(
    `SELECT * FROM products WHERE 1=1 ${where} LIMIT ${offset},${config.listPerPage}`
  );
  const total = await db.query(
    `SELECT count(*) as total FROM products WHERE 1=1 ${where}`
  );
  const products = helper.emptyOrRows(rows);
  const page = intpage;
  const pages =  Math.ceil(total[0]["total"] / `${config.listPerPage}`);

  return {
    products,
    page,
    pages
  }
}
async function getlisttop(){
  const rows = await db.query(
    `SELECT * FROM products WHERE ishot=1 LIMIT 3`
  );
  const products = helper.emptyOrRows(rows);
  return products
}
async function getinfo(id){
  const rows = await db.query(
    `SELECT * FROM products WHERE id="${id}"`
  );
  const data = rows[0]
  return data
}
async function remove(id){
  const rows = await db.query(
    `DELETE FROM products WHERE id=${id}`
  );
  const data = "Product removed"
  return data
}
async function update(id,name,price,image,brand,category,description,countInStock){
  const rows = await db.query(
    `UPDATE products set name="${name}", price="${price}", image="${image}", brand="${brand}", category="${category}", description="${description}", countInStock="${countInStock}" WHERE id=${id}`
  );
  return {
    id: id,
  }
}
async function insert(name,price,image,brand,category,description,countInStock){
  const rows = await db.query(
    `Insert into products (name,price,image,brand,category,description,countInStock) values ("${name}","${price}","${image}","${brand}","${category}","${description}","${countInStock}")`
  );
  const rows1 = await db.query(
    `SELECT * FROM products order by id desc limit 1`
  );
  const data = rows1[0]
  return data
}
module.exports = {
  getlist,
  getinfo,
  remove,
  update,
  getlisttop,
  insert
}