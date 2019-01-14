import { nodeTypes } from "../../constants";

class CommandHelper {
    getSelectedDb = props => {
        const { selectedDbId, dbs } = props;
        if (selectedDbId == null) {
            return null;
        }
        return dbs.find(x => x.id === selectedDbId);
    }

    getKey(props, keyId) {
        return props.keys.find(x => x.id === keyId);
    }

    getFullPath(props) {
        const { selectedNodeType } = props;
        switch (selectedNodeType) {
            case nodeTypes.CONNECTION:
                const conn = this.getSelectedConnection(props);
                return conn ? conn.name : '';
            case nodeTypes.DB:
                const db = this.getSelectedDb(props);
                return db ? `${db.connectionName}\\db${db.dbIdx}` : '';
            case nodeTypes.KEY:
                const key = this.getSelectedKey(props);
                if (key == null) {
                    return '';
                }
                return `${key.connectionName}\\db${key.dbIdx}\\${key.key}`;
            default:
                return null;
        }
    }

    getSelectedKey = props => {

        const { selectedKeyId, keys, selectedNodeType } = props;
        if (selectedNodeType !== nodeTypes.KEY) {
            return null;
        }

        return keys.find(x => x.id === selectedKeyId);
    }

    getSelectedConnection = props => {
        const { selectedConnectionId, connections } = props;
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