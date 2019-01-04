import { modifyKeyCommand } from './key'
import { modifyConnectionCommand } from './connection'
import { nodeTypes } from '../../constants'
import { commandHelper } from './commandHelper'

/**
 * 修改键命令
 * @param {{redisKey, dispatch, dbIdx, connectionName, dbId }} param0 
 */
export const compositModifyCommand = props => {
    return {
        canExecute: () => {
            const { selectedKeyId, multiSelectItems, selectedConnectionId, selectedNodeType } = props;
            if (multiSelectItems.length > 1) {
                return false;
            }
            if (selectedNodeType !== nodeTypes.DB && selectedNodeType !== nodeTypes.KEY && selectedNodeType !== nodeTypes.CONNECTION) {
                return false;
            }
            if(multiSelectItems.length===0 && selectedNodeType===nodeTypes.DB){
                return false;
            }

            if (multiSelectItems.length > 0 && selectedNodeType === nodeTypes.CONNECTION) {
                return false;
            }

            return multiSelectItems.length === 1 || selectedKeyId != null || selectedConnectionId != null;
        },

        execute: async () => {
            const { dispatch, selectedKeyId, multiSelectItems, selectedNodeType } = props;
            if (selectedNodeType === nodeTypes.CONNECTION) {
                const connection=commandHelper.getSelectedConnection(props);
                const {ip,name,password,port}=connection;
                modifyConnectionCommand({dispatch,...{ip,name,password,port},oldName:name});
                return;
            }
            const sk = commandHelper.getSelectedKey(props);
            const { dbIdx, dbId, connectionName, key, type } = sk;
            const entity = { dispatch, key, keyType: type, dbIdx, dbId, connectionName };
            if (multiSelectItems.length === 1) {
                modifyKeyCommand(entity);
            }
            else if (selectedKeyId != null) {
                modifyKeyCommand(entity);
            }


        },
    }
}

