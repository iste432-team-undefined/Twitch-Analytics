class View{
    constructor(viewType,contentID){
        this._viewType = viewType;
        this._contentID = contentID;
    }

    get viewType(){
        return this._viewType;
    }

    get contentID(){
        return this._contentID;
    }

}
module.exports = View;