import { commandHelper } from './commandHelper'
import { openConnectionCommand } from './connection'
import {dbStates,connectionStates} from '../../constants'
import { refreshDbCommand } from './db'

export const compositOpenCommand = props => {
    return {
        canExecute: () => {
            const { selectedConnectionId, selectedDbId } = props;
            if (selectedConnectionId == null) {
                return false;
            }
            if (selectedDbId != null) {
                const selectedDb=commandHelper.getSelectedDb(props);
                return selectedDb? selectedDb.dbState === dbStates.NONE :false;
            }
            else {
                const conn = commandHelper.getSelectedConnection(props);
                return conn == null ? false : conn.connectionState === connectionStates.NONE;
            }
        },

        execute: () => {
            const { dispatch, selectedDbId, selectedConnectionId } = props;
            if (selectedDbId != null) {
                const db = commandHelper.getSelectedDb(props);
                refreshDbCommand({ dispatch, dbIdx: db.dbIdx, connectionName: db.connectionName, dbId: db.id });
            }
            else {
                openConnectionCommand({ dispatch, connectionId: selectedConnectionId });
            }
        },
    }
}