
const jwt = require('jsonwebtoken');
const config = require('./config');
function getOffset(currentPage = 1, listPerPage) {
    return (currentPage - 1) * [listPerPage];
  }
  
  function emptyOrRows(rows) {
    if (!rows) {
      return [];
    }
    return rows;
  }
  function emptyOrRowsInfo(rows) {
    if (rows) {
      return $rows[0];
    }
    return {};
  }
  function generateToken(id)  {
    return jwt.sign({ id }, `${config.jwtkey}`, { expiresIn: "30d" });
  }


  function protect(token){
    if (!token) {
      return -1
    }else{
      try {
        token1 = token.split(" ")[1];

        const decoded = jwt.verify(token1, `${config.jwtkey}`);
        return decoded.id
      } catch (error) {
        console.error(error);
        return -2;
      }
    }
  

  };



  module.exports = {
    getOffset,
    emptyOrRows,
    generateToken,
    protect,
    emptyOrRowsInfo
  }