import mysql from "mysql"

const db = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"Atasacir9689842!",
    database:"db"
    // used https://stackoverflow.com/questions/51147964/errno-1251-sqlmessage-client-does-not-support-authentication-protocol-reques
    // for authentication problems
    // ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'your_mysql_password';
})