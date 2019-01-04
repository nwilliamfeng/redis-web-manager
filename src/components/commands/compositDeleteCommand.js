import { nodeTypes } from '../../constants'
import { deleteKeyCommand, multiDeleteKeyCommand } from './key'
import {deleteConnectionCommand} from './connection'
import {commandHelper} from './commandHelper'

/**
 * 修改键命令
 * @param {{redisKey, dispatch, dbIdx, connectionName, dbId }} param0 
 */
export const compositDeleteCommand = props => {
    return {
        canExecute: () => {
            const { multiSelectItems, selectedKeyId, selectedConnectionId,selectedNodeType } = props;
            if (multiSelectItems.length > 0 && selectedNodeType === nodeTypes.CONNECTION) {
                return false;
            }
            return multiSelectItems.length > 0 || selectedKeyId != null || (selectedConnectionId != null && selectedNodeType===nodeTypes.CONNECTION);
        },

        execute: () => {
            const { selectedKeyId, selectedDbId, selectedConnectionId, dispatch, selectedNodeType, multiSelectItems, keys } = props;
            if (multiSelectItems.length > 0) {//优先处理多选
                if (selectedNodeType === nodeTypes.DB) {
                    const dbIdx = commandHelper.getSelectedDb(props).dbIdx;
                    const keyNames = multiSelectItems.map(x => keys.find(a => a.id === x).key);
                    multiDeleteKeyCommand({ dispatch, connectionName: selectedConnectionId, dbIdx, keyNames, dbId: selectedDbId });
                }

                return;
            }
            if (selectedKeyId !== null) {
                const key = commandHelper.getSelectedKey(props);
                deleteKeyCommand({ dispatch, connectionName: selectedConnectionId, dbId: selectedDbId, dbIdx: key.dbIdx, keyName: key.key });
            }
            else {
                deleteConnectionCommand({ dispatch, connectionId: selectedConnectionId });
            }
        },
    }
}

