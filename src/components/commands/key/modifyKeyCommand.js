import { modifyStringKeyCommand } from './modifyStringKeyCommand'
import { keyType as KT } from '../../../constants'

/**
 * 修改键命令
 * @param {{key,keyType, dispatch, dbIdx, connectionName, dbId }} param0 
 */
export const modifyKeyCommand = async ({ dispatch, key, keyType, dbIdx, dbId, connectionName }) => {
    console.log({ dispatch, key, keyType, dbIdx, dbId, connectionName });
    switch (keyType) {
        case KT.STRING:
            modifyStringKeyCommand({ dispatch, key, keyType, dbIdx, dbId, connectionName });
            break;
        case KT.HASH:
            //modifyStringKeyCommand({ dispatch, key, keyType, dbIdx, dbId, connectionName });
            break;
        case KT.SET:
           // modifyStringKeyCommand({ dispatch, key, keyType, dbIdx, dbId, connectionName });
            break;
        case KT.ZSET:
          //  modifyStringKeyCommand({ dispatch, key, keyType, dbIdx, dbId, connectionName });
            break;
        case KT.LIST:
          //  modifyStringKeyCommand({ dispatch, key, keyType, dbIdx, dbId, connectionName });
            break;
        default:
            break;
    }
}

