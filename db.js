const { Pool, Client } = require('pg')
const format = require('pg-format');

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
      name: 'get-username',
      text: format('SELECT username FROM "user" WHERE id_user = $1'),
      values: [1],
      }
  
  return new Promise( (resolve, reject) => {
      pool.query(query, (err, result) => {
          if (err) {
              return reject(err);
          }
          resolve(result.rows);
      });
  });
}

function getUser(id){
	const userQuery = {
		name: 'get-user',
		text: format('SELECT * from "user" WHERE id_user = $1'),
		values:[id],
	}

	return new Promise( (resolve, reject) => {
		pool.query(userQuery, (err, result) => {
			if (err) {
				return reject(err);
			}
			return resolve(result.rows);
		});
	});
}

function getDashboard(id){
	const dashQuery = {
		name: 'get-dash',
		text: format('SELECT * FROM dashboard WHERE id_dashboard=$1'),
		values:[id],
	}

	return new Promise( (resolve, reject) => {
		pool.query(dashQuery, (err,result) =>{
			if(err){
				return reject(err);
			}
				return resolve(result.rows);
		});
	});
}

function getView(id){
	const viewQuery = {
		name: 'get-view',
		text: format('SELECT * FROM "view" WHERE id_view=$1'),
		values:[id],
	}

	return new Promise( (resolve, reject) => {
		pool.query(viewQuery, (err,result) =>{
			if(err){
				return reject(err);
			}
				return resolve(result.rows);
		});
	});
}

function getUserDashboardIds(uid){
	const dashQuery = {
		name: 'get-user-dash',
		text: format('SELECT * FROM user_dashboard WHERE id_user=$1'),
		values:[uid],
	}

	return new Promise( (resolve, reject) => {
		pool.query(dashQuery, (err,result) =>{
			if(err){
				return reject(err);
			}
				return resolve(result.rows);
		});
	});
}

function getDashboardViewIds(did) {
	const dashQuery = {
		name: 'get-dash-views',
		text: format('SELECT * FROM dashboard_view WHERE id_dashboard=$1'),
		values:[did],
	}

	return new Promise( (resolve, reject) => {
		pool.query(dashQuery, (err,result) =>{
			if(err){
				return reject(err);
			}
				return resolve(result.rows);
		});
	});
}

function createDashboard(name,ownerID){
	let dashID;
	const createDashQuery = {
			name: 'make-dash',
			text: format('INSERT INTO dashboard (title) VALUES ($1) RETURNING id_dashboard'),
			values: [name],
		}
	
	new Promise( (resolve, reject) =>{
		pool.query(createDashQuery, (err,result) => {
			if (err) {
				return reject(err);
			}
			dashID = resolve(result.rows[0]);
			// createDashboardRelation(ownerID,dashID);
		});
	});

	const createRelation = {
		name: 'create-relation',
		text: format('INSERT INTO user_dashboard (id_user, id_dashboard) VALUES ($1,$2)'),
		values: [ownerID,dashID],
	}

	return new Promise((resolve, reject) =>{
		pool.query(createRelation, (err,result) =>{
			if(err) {
				return reject(err);
			}
			return resolve (result.rows[0]);
		});
	});

	

}

// function createDashboardRelation(ownerID,dashID){
	// const createRelation = {
	// 	name: 'create-relation',
	// 	text: format('INSERT INTO user_dashboard (id_user,id_dashboard) VALUES ($1,$2)'),
	// 	values: [ownerID,dashID],
	// }

// 	return new Promise ( (resolve, reject) =>{
// 		pool.query(createRelation, (err,result) => {
// 			if(err){
// 				return reject(err);
// 			}
// 			return resolve(result.rows[0])
// 		});
// 	});
// }

async function test() {
	// testConn().then( (res) => {
	// 	console.log(res[0]) ;
	// }).catch( (err) => setImmediate(() => { throw err; }));

	// getUser(1).then( (res) => {
	// 	console.log(res[0]);
	// }).catch( (err) => setImmediate(() => {throw err; }));

	// getDashboardName(1).then( (res) => {
	// 	console.log(res[0]);
	// }).catch( (err) => setImmediate(() => {throw err;}));

	createDashboard("ahhhh",1).then( (res) => {
		console.log(res.id_dashboard) ;
	}).catch( (err) => setImmediate(() => {throw err; }));

	// getDashboardName(3).then( (res) => {
	// 	console.log(res[0]);
	// }).catch( (err) => setImmediate(() => {throw err;}));

// 	getUser(1).then( (res) => {
// 		console.log(res);
// 	}).catch( (err) => setImmediate(() => {throw err; }));

// 	getUserDashboardIds(1).then( (res) => {
// 		res.forEach(elementx => {
// 			console.log(elementx);
// 			getDashboardViewIds(elementx.id_dashboard).then( (res) => {
// 				res.forEach(elementy => {
// 					console.log(elementy)
// 					getView(elementy.id_view).then((res) => {
// 						console.log(res);
// 					}).catch( (err) => setImmediate(() => {throw err;}) );
// 				});
// 			}).catch( (err) => setImmediate(() => {throw err;}) );
// 		});
// 	}).catch( (err) => setImmediate(() => {throw err; }));

}

test();

module.exports = {
  testConn,
  getUser,
  getDashboard,
  createDashboard,
  getDashboardViewIds,
  getUserDashboardIds,
  getView
}