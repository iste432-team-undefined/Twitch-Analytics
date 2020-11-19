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
}

module.exports = User;

