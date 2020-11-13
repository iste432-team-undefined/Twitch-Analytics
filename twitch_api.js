const axios = require('axios') ;

const client_id = '7j49l2zp0qud3b2ppqboximy6uqjl9';
const client_secret = '3cel4zw4sy6kjhozvu9dvuc7njml4v' ;
const grant_type = 'client_credentials' ;

const twitch_api = 'https://api.twitch.tv/helix/' ;

// MUST BE CALLED TO GET A GOOD OAUTH TOKEN
// getTwitchRITClientAccessToken(tokenRecieved) ;

// function getTwitchRITClientAccessToken (callback) {
//     axios
//     .post('https://id.twitch.tv/oauth2/token?client_id='+client_id+'&client_secret='+client_secret+'&grant_type='+grant_type)
//     .then(res=> {
//         callback(res.data.access_token) ;
//     });
// }

// // This is where we do things AFTER we get a client token
// function tokenRecieved(client_token) {
//     console.log("Client Token: " + client_token) ;

//     // This call is where we get twitch user information from a username
//     getTwitchUser(client_token, "shroud", display) ;
// }

// This actually makes the call to the twitch api and callsback to a display function to push to the frontend
async function getTwitchUser(token, username) {
    let config = {
        headers: {
            Authorization: 'Bearer '+token,
            'Client-Id': client_id
        }
    }

    return new Promise( (resolve, reject) =>{
        axios
            .get(twitch_api+'users?login='+ username, config)
                .then(res => {
                    console.log(res.data);
                    return resolve(res.data);
                })
                .catch(err => {
                    console.log(err) ;
                    return reject(err) ;
                });
    });
}

async function getToken() {
    return new Promise( (resolve, reject) =>{
        axios
            .post('https://id.twitch.tv/oauth2/token?client_id='+client_id+'&client_secret='+client_secret+'&grant_type='+grant_type)
            .then(res=> {
                return resolve(res.data.access_token) ;
            }).catch( err => {
                return reject(err) ;
            });
    });
}

module.exports = {
    getToken,
    getTwitchUser
}