
//MySQL Connection
const mysql = require('mysql');
const connection = mysql.createConnection({

    host: 'localhost',
    user: 'root',
    password: 'vaibhav',
    database: 'project'

});
module.exports = connection;

