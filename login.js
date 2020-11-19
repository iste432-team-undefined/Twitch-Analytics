const bcrypt = require('bcrypt');
const dbconn = require('./db');
const saltRounds = 12;

function createNewUser(username, password) {
    return new Promise( async (resolve, reject) => {

        let hashedpass = await new Promise( (resolve, reject) => {
            bcrypt.hash(password, saltRounds, (err, hash) => {
                if(err) {
                    reject(err) ;
                }
                resolve(hash) ;
            });
        });

        let newId = await dbconn.createUser(username, hashedpass);

        if(newId[0].id_user != -1 && hashedpass) {
            resolve(newId[0].id_user) ;
        }
        else {
            reject(-1) ;
        }
    });
}

function loginUser(username, password) {
    let userCheck = null;
    return new Promise( async (resolve, reject) => {

        userCheck = await dbconn.getUserByName(username);

        bcrypt.compare(password, userCheck.password, function (err, result) {
            if(err) {
                reject(err) ;
            }

            if (result == true) {
                resolve(userCheck.id_user);
            } else {
                resolve(-1) ;
            }
        });
    });
}

async function test() { 
    let test_id = await createNewUser("test5","test1");
    console.log(test_id) ; 

    let test_login = await loginUser("test5","test1") ;
    console.log(test_login) ;
}

// test();