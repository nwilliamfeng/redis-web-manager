import { dbStates } from '../../constants'
import { commandHelper } from './commandHelper'

import { addKeyCommand } from './key'

/**
 * 添加键命令
 * @param {{ dispatch, dbIdx, connectionName, dbId }} param0 
 */
export const compositAddKeyCommand = props => {
    return {
        canExecute: () => {
            const { selectedDbId } = props;
            if (selectedDbId == null) {
                return false;
            }
            const db = commandHelper.getSelectedDb(props);
            return db == null ? false : db.dbState === dbStates.KEY_LOAD_SUCCESS;
        },

        execute: () => {
            const db = commandHelper.getSelectedDb(props);
            const { dispatch } = props;
            const { dbIdx, connectionName, id } = db;
            addKeyCommand({ dispatch, dbIdx, connectionName, dbId: id });
        },
    }
}

