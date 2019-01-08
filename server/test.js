var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'Zhu123456',
  database : 'blog'
});
 
connection.connect(function(err) {
  if (err) {
    console.error('error connecting: ' + err.stack);
    return;
  }

  console.log('connected as id ' + connection.threadId);
});

let createUser = `
  create table z_user(
    id varchar(32) not null primary key,
    username varchar(30) not null,
    nickname varchar(30) default null,
    gender bit default 1,
    email varchar(50) default null,
    blogurl varchar(255) default null
  )
`
connection.query(createUser,function (err, result) {
  if(err){
    console.log('[SELECT ERROR] - ',err.message);
    return;
  }

 console.log('--------------------------SELECT----------------------------');
 console.log(result);
 console.log('------------------------------------------------------------\n\n');  
});

connection.end();


