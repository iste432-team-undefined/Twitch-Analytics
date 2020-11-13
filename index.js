const express = require('express') ;
const twitch = require('./twitch_api') ;

var token = "";

const app = new express();

function display() {
    app.get('/', async function(req, res) {
        let twitch_user = "";
        twitch_user = await twitch.getTwitchUser(token, "shroud") ;

        res.send(twitch_user.data) ;
    });
}


app.listen(3000, async function() {
    console.log(`Example app listening at http://localhost:3000/`);
    token = await twitch.getToken() ;
    display() ;
});