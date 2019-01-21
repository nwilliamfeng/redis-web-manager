import {  locator } from '../../utils'
import { refreshConnectionCommand,refreshConnectionsCommand } from './connection'
import {dbStates,connectionStates,nodeTypes} from '../../constants'
import { refreshDbCommand } from './db'
import { refreshKeyCommand } from './key'

export const compositRefreshCommand = props => {
    return {
        canExecute: () => {
            const { selectedDbId, selectedConnectionId,selectedNodeType,selectedKeyId } =  props;
            if(selectedNodeType===nodeTypes.ROOT){
                return true;
            }
         
           
            if (selectedDbId == null && selectedConnectionId == null) {
                return false;
            }
            if(selectedNodeType===nodeTypes.KEY && selectedKeyId!=null){
                return true;
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
            if(selectedNodeType===nodeTypes.KEY){
                const redisKey = locator.getSelectedKey(props);
                refreshKeyCommand({dispatch,redisKey});
                return;
            }
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