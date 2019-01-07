 

import { nodeTypes,keyType } from '../../constants'
import { commandHelper } from './commandHelper'

/**
 * 保存键命令
 * @param {{redisKey, dispatch, dbIdx, connectionName, dbId }} param0 
 */
export const compositSaveCommand = props => {
    return {
        canExecute: () => {
            const {selectedNodeType,isKeyDirty} = props;
            return selectedNodeType===nodeTypes.KEY && isKeyDirty===true;
        },

        execute: async () => {
            const {saveKeyHandle} =props;
            if(saveKeyHandle!=null){
                saveKeyHandle();
            }
            else{
                console.log('the saveKeyHandle is null!!');
            }         
        },
    }
}

