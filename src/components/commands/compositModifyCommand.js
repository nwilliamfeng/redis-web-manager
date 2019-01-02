import { modifyStringKeyCommand } from './key'
import { nodeTypes } from '../../constants'
import  {commandHelper} from './commandHelper'

/**
 * 修改键命令
 * @param {{redisKey, dispatch, dbIdx, connectionName, dbId }} param0 
 */
export const compositModifyCommand = props => {
    return {
        canExecute: () => {
            const { selectedKeyId, multiSelectItems } = props;
            if(multiSelectItems.length>1){
                return false;
            }
            return multiSelectItems.length === 1 || selectedKeyId != null; //|| selectedConnectionId != null;
        },

        execute: async () => {
            const {dispatch, selectedKeyId, selectedConnectionId, multiSelectItems, selectedNodeType } = props;
            const sk =commandHelper.getSelectedKey(props);
            const {dbIdx,dbId,connectionName,key,type}=sk;
            const entity={dispatch,key,keyType:type,dbIdx,dbId,connectionName};
            if (multiSelectItems.length > 0) {
                if (selectedNodeType === nodeTypes.CONNECTION) {
                   // alert('do connection');
                }
                else if (selectedNodeType === nodeTypes.DB) {
                    modifyStringKeyCommand(entity);
                }
            }
            else {
                if (selectedKeyId != null) {
                    modifyStringKeyCommand(entity);
                }
                else if (selectedConnectionId != null) {
                   // alert('do connection');
                }
            }        
        },
    }
}

