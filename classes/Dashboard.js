class Dashboard{
    constructor(title,dashID,views){
        this._title = title;
        this._dashID = dashID;
        this._views = views;
    }

    get title(){
        return this._title;
    }

    get dashID(){
        return this._dashID;
    }

    get views(){
        return this._views;
    }

}

module.exports = Dashboard;