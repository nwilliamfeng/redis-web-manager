import {menuIds} from './menuIds'
import {spliter} from './spliter'
import {commandAction} from '../../actions'
import {tabPaneIds} from '../../constants'

const openSetting={
    isTopMenu:false,
    title:'设置',
    id: menuIds.SETTING_MENU,
    command:dispatch=>{
        dispatch(commandAction.openTabPane(tabPaneIds.SETTING_PANE));
    },
}
 

 
export const toolMenu={
    isTopMenu:true,
    title:'工具',
    id: menuIds.TOOL_MENU,
    subItems:[openSetting],
}

  