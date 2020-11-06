const axios = require('axios') ;
const express = require('express') ;
const app = new express();

const client_id = '7j49l2zp0qud3b2ppqboximy6uqjl9';
const client_secret = 'kxj7yegz4m53ljythes3xkpnhy3r2t' ;
const grant_type = 'client_credentials' ;

const twitch_api = 'https://api.twitch.tv/helix/' ;

const test_id = 89490179 ;

getTwitchRITClientAccessToken(tokenRecieved) ;

function getTwitchRITClientAccessToken (callback) {
    axios
    .post('https://id.twitch.tv/oauth2/token?client_id='+client_id+'&client_secret='+client_secret+'&grant_type='+grant_type)
    .then(res=> {
        callback(res.data.access_token) ;
    });
} 

function tokenRecieved(client_data) {
    console.log(client_data) ;
    testTwitchApi(client_data) ;
    getUserToken(client_data.access_token, display);
}

function testTwitchApi(data, callback) {
    let config = {
        headers: {
            Authorization: 'Bearer '+data.access_token,
            'Client-Id': client_id
        }
    }

    axios
        .get(twitch_api+'users/follows?from_id=89490179',config)
        .then(res => {
           // console.log(res);
            console.log(res.data);
        })
        .catch(err => {
            console.log(err) ;
        });
}


function getUserToken(client_token, callback) {
    let config = {
        headers: {
            'Access-Control-Allow-Origin': 'http://localhost'
        }
    }


    axios
        .get('https://id.twitch.tv/oauth2/authorize?response_type=token&client_id='+client_id+'&redirect_uri=http://localhost&scope=viewing_activity_read&state='+client_token, config)
        .then(res => {
            callback(res);
        });
}

function display(data) {
    app.get('/', function(req, res) {
        console.log(res) ;
        res.send(data.data) ;
    });
}


app.listen(3000, ()=> {
    console.log(`Example app listening at http://localhost:3000/`);
});