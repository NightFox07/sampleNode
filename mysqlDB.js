const mysql = require('mysql2/promise');
const { mysqlconfig } = require('./config');

const initPool = (req, res, next) => {
    try{
        const pool = mysql.createPool(mysqlconfig);
        req.pool = pool;
        next();
    } catch(error){
        next(error);
    }
}

module.exports = { initPool }