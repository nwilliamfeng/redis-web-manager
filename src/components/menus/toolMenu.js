import {menuIds} from './menuIds'
import {commandAction} from '../../actions'
import {tabPaneIds} from '../../constants'

const openSetting={
    isTopMenu:false,
    title:'设置',
    id: menuIds.SETTING_MENU,
    command:props=>{
        const {dispatch} =props;
        dispatch(commandAction.openTabPane(tabPaneIds.SETTING_PANE));
    },
}
 

 
export const toolMenu={
    isTopMenu:true,
    title:'工具(T)',
    id: menuIds.TOOL_MENU,
    subItems:[openSetting],
}

  