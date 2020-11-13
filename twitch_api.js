const axios = require('axios') ;

const client_id = '7j49l2zp0qud3b2ppqboximy6uqjl9';
const client_secret = '3cel4zw4sy6kjhozvu9dvuc7njml4v' ;
const grant_type = 'client_credentials' ;

const twitch_api = 'https://api.twitch.tv/helix/' ;

async function getTwitchUser(token, username) {
    let config = {
        headers: {
            Authorization: 'Bearer '+ token,
            'Client-Id': client_id
        }
    }

    let url = 'users?login='+username ;

    return await makeGetRequest(url, config); 
}


async function getTwitchGame(token, gamename) {
    let config = {
        headers: {
            Authorization: 'Bearer '+ token,
            'Client-Id': client_id
        }
    }

    let url = 'games?name='+gamename ;
    
    return await makeGetRequest(url, config); 
}


async function getTwitchGameById(token, content_id) {
    let config = {
        headers: {
            Authorization: 'Bearer '+ token,
            'Client-Id': client_id
        }
    }

    let url = 'games?id='+content_id ;

    return await makeGetRequest(url, config) ;
}


async function getTwitchUserById(token, content_id) {
    let config = {
        headers: {
            Authorization: 'Bearer '+ token,
            'Client-Id': client_id
        }
    }

    let url = 'users?id='+content_id ;

    return await makeGetRequest(url, config) ;
}


function makeGetRequest(url, config) {
    return new Promise( (resolve, reject) =>{
        axios
            .get(twitch_api + url, config)
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

function getToken() {
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
    getTwitchUser,
    getTwitchGame,
    getTwitchGameById,
    getTwitchUserById
}