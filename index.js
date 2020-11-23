const express = require('express') ;
const twitch = require('./twitch_api') ;
const DBconn = require('./db') ;
const path = require('path') ;
const login = require('./login');
const { loginUser } = require('./login');
const { compareSync } = require('bcrypt');
const bodyParser = require('body-parser') ;


var user = null;
var token = "";

const app = new express();

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");
app.use(express.static(path.join(__dirname, "public")));
app.use(bodyParser.urlencoded({extended:true})) ;


app.get('/', async function(req, res) {


    res.render("login", { title: "Login" });

});
app.post('/login', async function(req,res) {
    console.log(req.body);
    user = await loginUser(req.body.username, req.body.password)
    if(user != null && user.userID > 0) {
        console.log("login sucess");
        // sucLogin;
        res.redirect('/home') ;
    } else {
        console.log("login failure");
        res.redirect('/') ;
    }
});

app.get('/home', async function(req, res) {
    if(user == null) {
        res.redirect('/') ;
    }

    //let twitch_user = await twitch.getTwitchUser(token, "Shroud") ;
    //let twitch_game = await twitch.getTwitchGame(token, "Escape From Tarkov") ;

    //let response = JSON.stringify(twitch_user.data) + "<br/><br/>" + JSON.stringify(twitch_game.data) ;

    res.render("index", { title: "Home" , curUser: user , curDash: user.dashboards});
  });

app.listen(3000, async function() {
    console.log(`Example app listening at http://localhost:3000/`);
    token = await twitch.getToken() ; 
});


app.get('/views', async function(req, res) {
    if(user == null) {
        res.redirect('/') ;
    }

    res.render("views", { title: "View" , curUser: user , curDash: user.dashboards});


});