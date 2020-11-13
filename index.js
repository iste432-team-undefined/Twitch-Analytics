const express = require('express') ;
const twitch = require('./twitch_api') ;
const DBconn = require('./db') ;

var token = "";

const app = new express();

app.get('/', async function(req, res) {
    let twitch_user = await twitch.getTwitchUser(token, "shroud") ;
    let twitch_game = await twitch.getTwitchGame(token, "Escape From Tarkov") ;

    let response = JSON.stringify(twitch_user.data) + "<br/><br/>" + JSON.stringify(twitch_game.data) ;

    res.send(response) ;
});

app.listen(3000, async function() {
    console.log(`Example app listening at http://localhost:3000/`);
    token = await twitch.getToken() ; 
});