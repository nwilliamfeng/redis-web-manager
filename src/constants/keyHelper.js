import { keyType } from './keyType'
import { keyTypeValue } from './keyTypeValue'

class KeyHelper {
    getKeyTypeValue(type) {
        switch (type) {
            case keyType.STRING:
                return keyTypeValue.STRING;
            case keyType.LIST:
                return keyTypeValue.LIST;
            case keyType.SET:
                return keyTypeValue.SET;
            case keyType.ZSET:
                return keyTypeValue.ZSET;
            case keyType.HASH:
                return keyTypeValue.HASH;
            default:
                return keyTypeValue.STRING;
        }

    }
}

export const keyHelper =new KeyHelper();