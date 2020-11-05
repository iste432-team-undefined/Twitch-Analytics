const { Pool, Client } = require('pg')
const format = require('pg-format');
const e = require('express');
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'twitch',
    password: 'password',
    port: 5432,
  })
// **** Maybe deprecated?? ****
// function connectPool(){
//     pool.connect((err,client,done) =>{
//         if(err){
//             console.log(err);
//         }
//     });
// }
// function getUser(id){
//     pool.query('SELECT username FROM "user" WHERE id_user=($1)',(err,res) =>{
//         if (err){
//             console.log(err)
//         }
//         else{
//             console.log(res);
//         }
//     });
// }
// connectPool();
// getUser(1);


const query = {
    // give the query a unique name
    name: 'get-user',
    text: 'SELECT username FROM "user" WHERE id_user = $1',
    values: [1],
  }

pool
  .query(query)
  .then(res => console.log(res.rows[0]))
  .catch(e => console.error(e.stack))