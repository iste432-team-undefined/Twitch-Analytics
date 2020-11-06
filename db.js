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

function testConn() {
  const query = {
      // give the query a unique name
      name: 'get-user',
      text: 'SELECT username FROM "user" WHERE id_user = $1',
      values: [1],
      }

  
  return new Promise( (resolve, reject) => {
      pool.query(query, (err, result) => {
          if (err) {
              return reject(err);
          }
          resolve(result);
      });
  });
}

function getUser(id){
  const nameQuery = {
    name: 'get-name',
    text: format('SELECT username from "user" WHERE id_user = $1'),
    values:[id],
  }

  return new Promise( (resolve, reject) => {
    pool.query(nameQuery, (err, result) => {
        if (err) {
            return reject(err);
        }
        resolve(result);
    });
  });
}

function getDashboardName(id){
  const dashQuery = {
    name: 'get-dash',
    text: format('SELECT title FROM dashboard WHERE id_dashboard=$1'),
    values:[id],
  }

  return new Promise( (resolve, reject) => {
    pool.query(dashQuery, (err,result) =>{
      if(err){
        return reject(err);
      }
      resolve(result);
    });
  });
}

testConn().then( (res) => {
  console.log(res.rows[0]) ;
}).catch( (err) => setImmediate(() => { throw err; }));

getUser(1).then( (res) => {
  console.log(res.rows[0]);
}).catch( (err) => setImmediate(() => {throw err; }));

getDashboardName(1).then( (res) =>{
  console.log(res.rows[0]);
}).catch( (err) => setImmediate(() => {throw err;}));

module.exports = {
	testConn,
	getUser,
	getDashboardName
}