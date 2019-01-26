import { connectionActions,commandAction } from '../../../actions'
import {tabPaneIds} from '../../../constants'
 

 

export const openConnectionInfoCommand=({ dispatch, connectionId } )=>{
    dispatch(connectionActions.selectConnection(connectionId));
    dispatch(commandAction.openTabPane(tabPaneIds.CONNECTION_VIEW_PANE));
}

 
 
 