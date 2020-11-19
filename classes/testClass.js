const User = require('./User.js');
const Dashboard = require('./Dashboard.js');
const View = require('./View.js');



// Test Views
let view1 = new View(1,1234);
let view2 = new View(2,3321);
let view3 = new View(1,4321);
let viewSet = {view1,view2,view3};

let view4 = new View(1,324);
let view5 = new View(2,314);
let setView = {view4,view5};

// Test Dashboards
let dash1 = new Dashboard('yessir',123,viewSet);
let dash2 = new Dashboard('goodenough',432,setView);
let dashCollection = {dash1,dash2};
// Test User
let testUser = new User(1,'hahayes','41231',dashCollection);

console.log(testUser.userID);
console.log(testUser.username);
console.log(testUser.dashboards);
// console.log(testDashboard.title());

// console.log(testUser.userID);
