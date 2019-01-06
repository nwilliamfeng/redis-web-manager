 
import { saveStringKeyCommand } from './key'
import { nodeTypes,keyType } from '../../constants'
import { commandHelper } from './commandHelper'

/**
 * 保存键命令
 * @param {{redisKey, dispatch, dbIdx, connectionName, dbId }} param0 
 */
export const compositSaveCommand = props => {
    return {
        canExecute: () => {
            const {selectedNodeType} = props;
            return selectedNodeType===nodeTypes.KEY;
        },

        execute: async () => {
            console.log(props);
            const redisKey =commandHelper.getSelectedKey(props);
            const {dispatch,saveKeyHandle} =props;
            if(saveKeyHandle!=null){
                saveKeyHandle();
            }
            else{
                console.log('the saveKeyHandle is null!!');
            }
            // switch(redisKey.type){
            //     case keyType.STRING:
            //        // saveStringKeyCommand({...redisKey,dispatch});
            //     break;
            //     default:
            //     break;
            // }
        },
    }
}

