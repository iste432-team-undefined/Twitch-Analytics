const Database = require('../db.js');

class Dashboard{
    constructor(dashID,title,views){
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

    async addView(viewObj){
        let addView = await Database.addViewDashboardRelation(this._dashID,viewObj.viewID);
        if(addView){
            this.views.add(viewObj);
        }
    }

    async removeView(viewObj){
        let removeView = await  Database.removeViewDashboardRelation(this._dashID,viewObj.viewID);
        if(removeView){
            this.views.delete(viewObj);
        }
    }
}

module.exports = Dashboard;