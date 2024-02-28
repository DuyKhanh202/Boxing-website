const db = require('./db');
const helper = require('../helper');
const config = require('../config')

async function login(email,password){
  const rows = await db.query(
    `SELECT id,email,isAdmin,name FROM users WHERE email="${email}" AND password="${password}"`
  );
   if(rows.length>0){
    return {
      id: rows[0].id,
      name: rows[0].name,
      email: rows[0].email,
      isAdmin: rows[0].isAdmin,
      token: helper.generateToken(rows[0].id), 
    }
  }
}
async function getinfo(id){
  const rows = await db.query(
    `SELECT * FROM users WHERE id=${id}`
  );
  return rows

}
async function getexist(email){
  const rows = await db.query(
    `SELECT * FROM users WHERE email="${email}"`
  );
  return rows

}
async function getedit(id){
  const rows = await db.query(
    `SELECT * FROM users WHERE id=${id}`
  );
  return rows[0]

}
async function getlist(keyword,intpage = 1){
  const rows = await db.query(
    `SELECT * FROM users`
  );
  const users = helper.emptyOrRows(rows);

  return users
}
async function update(id,name,isadmin,email){
  const rows = await db.query(
    `UPDATE users SET name="${name}",isadmin="${isadmin}" WHERE id=${id}`
  );
  return rows[0]

}
async function remove(id){
  const rows = await db.query(
    `DELETE FROM users WHERE id=${id}`
  );
  return rows.affectedRows

}
async function inser(name,email,password){
  const rows = await db.query(
    `INSERT INTO users (name,email,password,isadmin) VALUES ("${name}","${email}" ,"${password}",0)`
  );
  return rows[0]

}
module.exports = {
  login,
  getinfo,
  getlist,
  update,
  remove,
  getedit,
  inser,getexist
}