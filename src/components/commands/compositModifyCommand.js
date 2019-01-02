import { modifyKeyCommand } from './key'
import { nodeTypes } from '../../constants'

/**
 * 修改键命令
 * @param {{redisKey, dispatch, dbIdx, connectionName, dbId }} param0 
 */
export const compositModifyCommand = props => {
    return {
        canExecute: () => {
            const { selectedKeyId, selectedConnectionId, multiSelectItems } = props;
            if(multiSelectItems.length>1){
                return false;
            }
            return multiSelectItems.length === 1 || selectedKeyId != null; //|| selectedConnectionId != null;
        },

        execute: async () => {
            const { selectedKeyId, selectedConnectionId, multiSelectItems, selectedNodeType } = props;
            if (multiSelectItems.length > 0) {
                if (selectedNodeType === nodeTypes.CONNECTION) {
                   // alert('do connection');
                }
                else if (selectedNodeType === nodeTypes.DB) {
                    modifyKeyCommand(props).execute();
                }
            }
            else {
                if (selectedKeyId != null) {
                    modifyKeyCommand(props).execute();
                }
                else if (selectedConnectionId != null) {
                   // alert('do connection');
                }
            }        
        },
    }
}

