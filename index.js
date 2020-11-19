const express = require('express') ;
const twitch = require('./twitch_api') ;
const DBconn = require('./db') ;
const path = require('path') ;

var token = "";

const app = new express();

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");
app.use(express.static(path.join(__dirname, "public")));


app.get('/', async function(req, res) {
    let twitch_user = await twitch.getTwitchUser(token, "shroud") ;
    let twitch_game = await twitch.getTwitchGame(token, "Escape From Tarkov") ;

    let response = JSON.stringify(twitch_user.data) + "<br/><br/>" + JSON.stringify(twitch_game.data) ;

    res.render("index", { title: "Home" , message: twitch_user.data});

});

app.listen(3000, async function() {
    console.log(`Example app listening at http://localhost:3000/`);
    token = await twitch.getToken() ; 
});