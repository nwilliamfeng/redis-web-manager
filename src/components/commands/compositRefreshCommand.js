import {  locator } from '../../utils'
import { refreshConnectionCommand,refreshConnectionsCommand } from './connection'
import {dbStates,connectionStates,nodeTypes} from '../../constants'
import { refreshDbCommand } from './db'

export const compositRefreshCommand = props => {
    return {
        canExecute: () => {
            const { selectedDbId, selectedConnectionId,selectedNodeType } =  props;
            if(selectedNodeType===nodeTypes.ROOT){
                return true;
            }
            if(selectedNodeType!== nodeTypes.CONNECTION && selectedNodeType!==nodeTypes.DB){
                return false;
            }
           
            if (selectedDbId == null && selectedConnectionId == null) {
                return false;
            }
            if (selectedDbId != null) {
                const selectedDb=locator.getSelectedDb(props);
                return selectedDb? selectedDb.dbState === dbStates.KEY_LOAD_SUCCESS :false;
            }
            const conn = locator.getSelectedConnection(props);
            return conn?conn.connectionState === connectionStates.CONNECTED:false;
        },

        execute: () => {
            const { dispatch, selectedDbId, selectedConnectionId,selectedNodeType  } = props;
            if(selectedNodeType===nodeTypes.ROOT){
                refreshConnectionsCommand({dispatch});
                return;
            }
            if (selectedDbId != null) {
                const db = locator.getSelectedDb(props);
                refreshDbCommand({ dispatch, dbIdx: db.dbIdx, connectionName: db.connectionName, dbId: db.id });
            }
            else {
                refreshConnectionCommand({ dispatch, connectionId: selectedConnectionId });
            }
        },
    }
}