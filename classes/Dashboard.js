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
        let addView;
        Database.addDashboardUserRelation(this._dashID,viewObj.viewID).then( (res) => {
	 	    addView = res[0];
	    }).catch( (err) => setImmediate(() => {throw err;}));
        if(addView){
            this.views.add(viewObj);
        }
    }

    async removeView(viewObj){
        let removeView;
        Database.removeViewDashboardRelation(this._dashID,viewObj.viewID).then( (res) =>{
            removeView = res[0];
        }).catch( (err) => setImmediate(() => {throw err;}));
        if(removeView){
            this.views.delete(viewObj);
        }
    }
}

module.exports = Dashboard;