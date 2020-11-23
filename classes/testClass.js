const User = require('./User.js');
const Dashboard = require('./Dashboard.js');
const View = require('./View.js');

// Test Views
let view1 = new View(1,1,37402112);
let view2 = new View(2,2,491931);
let view3 = new View(3,1,19571641);
let view4 = new View(4,2,7512352);
let view5 = new View(5,1,146582633);
let view6 = new View(6,2,27471);
let view7 = new View(7,1,110690086);
let view8 = new View(8,2,516575)

// Test view sets
let viewSet = new Set();
viewSet.add(view1);
viewSet.add(view4);
viewSet.add(view7);

let setView = new Set();
setView.add(view2);
setView.add(view5);

let finalSet = new Set();
finalSet.add(view3);
finalSet.add(view6);

console.log(viewSet);


// Test Dashboards
let dash1 = new Dashboard(1,'gamer_man1 Dashboard',viewSet);
let dash2 = new Dashboard(2, 'Xxx_gamer420_xxX Dashboard',setView);
let dash3 = new Dashboard(3,'GgeZ Dashboard',finalSet)

dash3.addView(view7);

let dashSet = new Set;
dashSet.add(dash1);
dashSet.add(dash2);

// Test User
let testUser = new User(1,'gamer_man1',dashSet);

console.log("UserID: "+testUser.userID);
console.log("Username: "+testUser.username);
console.log(testUser.dashboards);
console.log(' ');
dash2.addView(view8);

// JSON Example of user object
console.log('JSON Output Example');
console.log('===================');
console.log(JSON.stringify(testUser));

testUser.addDashboard(dash3)
console.log(testUser.dashboards);