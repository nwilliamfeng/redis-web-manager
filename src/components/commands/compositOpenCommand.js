import {   locator } from '../../utils'
import { openConnectionCommand,openConnectionsCommand } from './connection'
import {dbStates,connectionStates, nodeTypes} from '../../constants'
import { refreshDbCommand ,refreshDbsCommand} from './db'

export const compositOpenCommand = props => {
    return {
        canExecute: () => {
            const { selectedConnectionId, selectedDbId,multiSelectItems,selectedNodeType } = props;
            if(selectedNodeType===nodeTypes.ROOT && multiSelectItems.length>0){
                return true;
            }
            if(selectedNodeType===nodeTypes.CONNECTION && multiSelectItems.length>0){
                return true;
            }
            if (selectedConnectionId == null) {
                return false;
            }
            if (selectedDbId != null) {
                const selectedDb=locator.getSelectedDb(props);
                return selectedDb? selectedDb.dbState === dbStates.NONE :false;
            }
            else {
                const conn = locator.getSelectedConnection(props);
                return conn == null ? false : conn.connectionState === connectionStates.NONE;
            }
        },

        execute: () => {
            const { dispatch, selectedDbId, selectedConnectionId ,selectedNodeType,multiSelectItems,dbs} = props;
            if(selectedNodeType===nodeTypes.ROOT && multiSelectItems.length>0){
                openConnectionsCommand({dispatch,connectionIds:multiSelectItems});
                return;
            }

            if(selectedNodeType===nodeTypes.CONNECTION && multiSelectItems.length>0){
                const selectedDbs=multiSelectItems.map(x=>{
                    const db=dbs.find(d=>d.id===x);
                    return {dbIdx:db.dbIdx,dbId:db.id};
                })
                refreshDbsCommand({dispatch,connectionName:selectedConnectionId,dbs:selectedDbs});
                return;
            }

            if (selectedDbId != null) {
                const db = locator.getSelectedDb(props);
                refreshDbCommand({ dispatch, dbIdx: db.dbIdx, connectionName: db.connectionName, dbId: db.id });
            }
            else {
                openConnectionCommand({ dispatch, connectionId: selectedConnectionId });
            }
        },
    }
}