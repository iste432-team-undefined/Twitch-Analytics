class View{
    constructor(viewID,viewType,contentID){
        this._viewType = viewType;
        this._contentID = contentID;
        this._viewID = viewID;
    }

    get viewType(){
        return this._viewType;
    }

    get contentID(){
        return this._contentID;
    }

    get viewID(){
        return this._viewID;
    }

}
module.exports = View;