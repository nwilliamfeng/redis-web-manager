import {menuIds} from './menuIds'
import {spliter} from './spliter'
import {commandAction} from '../../actions'

const openListView={
    isTopMenu:false,
    title:'列表视图',
    id: menuIds.OPEN_LISTVIEW_MENU,
    command:dispatch=>{
        console.log('do open list view');
        dispatch(commandAction.openListView());
    },
}
 

 
export const viewMenu={
    isTopMenu:true,
    title:'查看',
    id: menuIds.VIEW_MENU,
    subItems:[openListView],
}

  