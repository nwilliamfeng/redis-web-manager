import {menuIds} from './menuIds'
import {tabPaneIds} from '../../constants'
import {commandAction} from '../../actions'

const openListView={
    isTopMenu:false,
    title:'列表视图',
    id: menuIds.OPEN_LISTVIEW_MENU,
    command:props=>{
        const {dispatch} =props;
        dispatch(commandAction.openTabPane(tabPaneIds.LIST_VIEW_PANE));
    },
}
 
const openSettingKeyView={
    isTopMenu:false,
    title:'键视图',
    id: menuIds.OPEN_KEY_SETTING_VIEW_MENU,
    command:props=>{
        const {dispatch} =props;
        dispatch(commandAction.openTabPane(tabPaneIds.KEY_SETTING_VIEW_PANE));
    },
}
 
export const viewMenu={
    isTopMenu:true,
    title:'查看(V)',
    id: menuIds.VIEW_MENU,
    subItems:[openListView,openSettingKeyView],
}

  