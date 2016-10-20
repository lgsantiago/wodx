var mysql = require("mysql");

var con = mysql.createConnection({
  host: "wodx.cpqp6rhd8p4g.us-west-2.rds.amazonaws.com",
  user: "wodxuser",
  password: "icdtibim1!",
  database: "wodx"
});

con.connect(function(err){
  if(err){
    console.log('Error connecting to Db');
    return;
  }
  console.log('Connection established');
});

//con.end(function(err) {});

exports.con = con;