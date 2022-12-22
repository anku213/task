const mysql = require('mysql');

const con = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"",
    database:"MedX"
})

con.connect((err)=>{
    if(err){
        console.log(err.sqlMessage)
    }
    console.log('Database Connected Successfully...')
})

module.exports = con;