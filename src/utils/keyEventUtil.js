class KeyEventUtil{
    checkCtrl(e){
        if(e.key==='Control' || e.key==='Shift'){
            return true;
        }
        if(e.ctrlKey===true && (e.key==='S' || e.key==='s')){
            return true;
        }
        return false;
    }

}


export const keyEventUtil=new KeyEventUtil();