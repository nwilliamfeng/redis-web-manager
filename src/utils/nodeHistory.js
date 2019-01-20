class NodeHistory{
    constructor(){
        this._history=[];
        this._currentNode=null;
        this._pushEnable=true;
    }

    push({nodeType,nodeValue}){
        if(this._pushEnable===false){
            this._pushEnable=true;
            return;
        }
        if(this._currentNode!=null){
            console.log(this._currentNode);
            this._history.push(this._currentNode);
        }
        this._currentNode={nodeType,nodeValue};
        
    }

    canPop(){
        return this._history.length>0;
    }

    pop(){
        this._pushEnable=false;
        const result= this._history.pop();
        if(this._history.length===0){
            this._currentNode=result;
        }
        return result;
    }
}

export const nodeHistory =new NodeHistory();