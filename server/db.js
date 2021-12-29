import mysql from 'mysql';

var conn = mysql.createConnection({
  host: 'localhost', // Replace with your host name
  user: 'test',      // Replace with your database username
  password: '12345678',      // Replace with your database password
  database: 'test' // // Replace with your database Name
}); 

conn.connect(function(err) {
  if (err) throw err;
  console.log('Database is connected successfully !');
});
export default conn;