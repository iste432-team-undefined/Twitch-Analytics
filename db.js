const e = require('express');
var mysql = require('mysql');
let connected = false;

var conn = mysql.createConnection({
	host:'localhost',
	user:'root',
	password:'YOUR_PASSWORD_HERE',
	database:'twitch_analytic_dashboard'
});

function connect(){
	conn.connect(function(err,res) {
		if (err){
			console.log("Unable to connect to database, check credentials");
			db_conn_callback(res,err);
			return
		}
		else{
		console.log("Connected!");
		connected=true;
		}
	});
}

function disconnect(){
	conn.end();
	connected=false;

}

function insertID(id){
	let stmt = "INSERT INTO user (idUser) VALUES("+id+")";
	stmt = mysql.format(stmt,id);
	conn.query(stmt, function(err,res){
		if(err){
			console.log("Unable to insert ID: "+id);
			db_conn_callback(res,err);
			return 
		}
		else{
			db_conn_callback(res,err);
			console.log("successfully inserted "+id);
		}
	});
}
function getID(id){
	let stmt = "SELECT * FROM user WHERE idUser=?";
	stmt = mysql.format(stmt,id);
	conn.query(stmt,function(err,res){
		if(err){
			console.log("Unable to get id: "+id)
			db_conn_callback(res,err);
			return
		}
		else if(res.length > 0) {
			db_conn_callback(res,err);
		}
		else{
			console.log(id+" does not exist in db");
		}
	})
}

function db_conn_callback(res,err){
	if(err){
		console.error(err);
		connected=false;
	}
	else{
		console.log(res);
		connected=true;
	}
}

connect();

// Quick tests for each function
insertID('a');
insertID('4356');
getID('4345');

//Disconnects from db and ends session
disconnect();