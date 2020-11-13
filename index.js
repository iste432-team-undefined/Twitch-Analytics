const express = require('express') ;
const twitch = require('./twitch_api') ;

const app = new express();

function display() {
    app.get('/', async function(req, res) {
        let token = "";
        let twitch_user_data = "";

        token = await twitch.getToken()
        .then( async function (res) {
            twitch_user_data = await twitch.getTwitchUser(res, "shroud") ;
        }) ;
        
        res.send(twitch_user_data.data) ;
    });
}


app.listen(3000, ()=> {
    console.log(`Example app listening at http://localhost:3000/`);
    display() ;
});