const bcrypt = require('bcrypt');
const dbconn = require('./db');

const User = require('./classes/User.js');
const Dashboard = require('./classes/Dashboard.js');
const View = require('./classes/View.js');

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
            let rtnUser = buildUser(newId[0].id_user,username);
                if(rtnUser){
                    resolve(rtnUser);
                }
                else {
                    reject(null) ;
                }
        }
        else {
            reject(null) ;
        }
    });
}


function loginUser(username, password) {
    let userCheck = null;
    return new Promise( async (resolve, reject) => {

        userCheck = await dbconn.getUserByName(username);

        if(!userCheck) {
            reject(null) ;
        }
        else {
            bcrypt.compare(password, userCheck.password, function (err, result) {
                if(err) {
                    reject(err) ;
                }

                if (result == true) {
                    let rtnUser = buildUser(userCheck.id_user,username);
                    if(rtnUser){
                        resolve(rtnUser);
                    }
                    else {
                        reject(null) ;
                    }
                } else {
                    resolve(null) ;
                }
            });
        }
    });
}

function buildUser(uid, username) {
    return new Promise( async (resolve, reject) => {
        let userData = await dbconn.getUserData(uid) ;
        let rtnUser = null;
        let dash_set = []; 

        if(userData && userData.length > 0) {   
            for(let i = 0; i < userData.length; i++) {
                if(userData[i].views && userData[i].views.length > 0) {
                    let view_set = [];

                    for(let x = 0; x < userData[i].views.length; x++) {
                        let newView = userData[i].views[x];
                        view_set.push(new View(newView.view_type, newView.content_id,newView.id_view));
                    }

                    dash_set.push(new Dashboard(userData[i].title, userData[i].id_dashboard, view_set));
                }
            }
        }

        rtnUser = new User(uid,username,dash_set);

        if(rtnUser) {
            resolve(rtnUser);
        }
        else {
            reject(null) ;
        }
    });
}

async function test() { 
    // let test_id = await createNewUser("test5","test");
    // console.log(test_id) ; 

    let test_login = await loginUser("gamer_man1","test")
    console.log(test_login) ;
    console.log(test_login.dashboards[0].views) ;
}

// test().catch((err) => {
//     console.log("user does not exist or cannot create user");
//     console.log(err);
// });

module.exports = {
    createNewUser,
    loginUser
}