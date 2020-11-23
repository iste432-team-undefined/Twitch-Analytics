const express = require('express') ;
const twitch = require('./twitch_api') ;
const DBconn = require('./db') ;
const path = require('path') ;
const login = require('./login');
const { loginUser } = require('./login');
const { compareSync } = require('bcrypt');
const bodyParser = require('body-parser') ;


var user = null;
var gdashboard;
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
        console.log("login success");
        res.redirect('/home') ;
    } else {
        console.log("login failure");
        res.redirect('/') ;
    }
});

//Returns the value of the dashboard clicked to query for views
app.post('/home', async function(req,res) {
    
    
    console.log(gdashboard);
    if(req.body != null){
        userI = req.body.dashValue;
        console.log(user.dashboards[0].title);
        for(var i = 0; i < user.dashboards; i++) {
            console.log(user.dashboards[i]);
            if(user.dashboards[i].title == userI){
                gdashboard = user.dashboards[i];
            }
        }


        let twitch_user = "";
        twitch_user = await twitch.getTwitchUserById(token, "37402112") ;
        //let response = JSON.stringify(twitch_user.data)
        res.render("views", {title: "View", curUser: user, curView: user.dashboards, tData: twitch_user.data});
    } else {
        console.log("something went wrong");
        res.redirect('/') ;
    }
});

//Controls the portal authentication and redirection of the user for the home page.
app.get('/home', async function(req, res) {
    if(user == null) {
        res.redirect('/') ;
    }
    res.render("index", { title: "Home" , curUser: user , curDash: user.dashboards});
  });


/*
//Sends correct display data based off the dashboard clicked. 
app.get('/view', async function(req, res) {
    if(user == null) {
        res.redirect('/') ;
    }

    res.render("views", { title: "View" , curUser: user , curDash: user.dashboards});


});*/

app.listen(3000, async function() {
    console.log(`Example app listening at http://localhost:3000/`);
    token = await twitch.getToken() ; 
});