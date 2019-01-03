import { nodeTypes } from "../../constants";

class CommandHelper {
    getSelectedDb = props => {
        const { selectedDbId, dbs } = props;
        if (selectedDbId == null) {
            return null;
        }
        return dbs.find(x => x.id === selectedDbId);
    }

    getSelectedKey = props => {

        const { selectedKeyId, keys, multiSelectItems, selectedNodeType } = props;
        if (selectedKeyId == null && multiSelectItems.length !== 1) {
            return null;
        }
        //如果有多选的项优先处理
        if (multiSelectItems.length === 1 && selectedNodeType === nodeTypes.DB) {
            return keys.find(x => x.id === multiSelectItems[0]);
        }

        return keys.find(x => x.id === selectedKeyId);
    }

    getSelectedConnection = props => {
        const { selectedConnectionId, connections } =  props;
        return selectedConnectionId == null ? null : connections.find(x => x.id === selectedConnectionId);
    }

    getKeyTypeName = keyValue => {
        switch (keyValue) {
            case 1:
                return 'string';
            case 2:
                return 'hash';
            case 3:
                return 'set';
            case 4:
                return 'zset';
            case 5:
                return 'list';
            default:
                return 'string';
        }
    }

    getKeyTypeValue = keyType => {
        switch (keyType) {
            case 'string':
                return 1;
            case 'hash':
                return 2;
            case 'set':
                return 3;
            case 'zset':
                return 4;
            case 'list':
                return 5;
            default:
                return 1;
        }
    }
}


export const commandHelper = new CommandHelper();