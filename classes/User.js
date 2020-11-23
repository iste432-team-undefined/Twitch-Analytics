const Database = require('../db.js');

class User{
    constructor(userID,username,dashboards){
        this._userID = userID;
        this._username = username;
        this._dashboards = dashboards;
    }
    //collection of dashboards

    get username(){
        return this._username;
    }

    get userID(){
        return this._userID;
    }
    //collection of dashboards
    get dashboards(){
        return this._dashboards;
    }

    async addDashboard(dashboardObj){
        let addDash = await Database.addDashboardUserRelation(this._userID,dashboardObj.dashID);
        if(addDash){
            this._dashboards.add(dashboardObj);
        }
    }

    async removeDashboard(dashboardObj){
        let removeDash = await Database.removeDashboardUserRelation(this._userID,dashboardObj.dashID);
        if(removeDash){
            this._dashboards.delete(dashboardObj);
        }
    }
}

module.exports = User;