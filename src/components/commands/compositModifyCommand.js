 
import { modifyConnectionCommand } from './connection'
import { nodeTypes } from '../../constants'
import { locator } from '../../utils'

/**
 * 修改键命令
 * @param {{redisKey, dispatch, dbIdx, connectionName, dbId }} param0 
 */
export const compositModifyCommand = props => {
    return {
        canExecute: () => {
            const {  multiSelectItems, selectedConnectionId, selectedNodeType } = props;
            if (multiSelectItems.length > 1) {
                return false;
            }
            if ( selectedNodeType !== nodeTypes.CONNECTION) {
                return false;
            }
           
            if (multiSelectItems.length > 0 && selectedNodeType === nodeTypes.CONNECTION) {
                return false;
            }

            return multiSelectItems.length === 1  || selectedConnectionId != null;
        },

        execute: async () => {
            const { dispatch,  selectedNodeType } = props;
            if (selectedNodeType === nodeTypes.CONNECTION) {
                const connection=locator.getSelectedConnection(props);
                const {ip,name,password,port}=connection;
                modifyConnectionCommand({dispatch,...{ip,name,password,port},oldName:name});          
            }
          


        },
    }
}

