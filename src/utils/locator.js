import { nodeTypes, connectionStates, dbStates } from "../constants";

class Locator {
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

    getNextConnection = props => {
        const { selectedConnectionId, connections } = props;
        if (selectedConnectionId == null) {
            return null;
        }
        const idx = connections.findIndex(x => x.id === selectedConnectionId);
        if (idx === connections.length - 1) {
            return connections[0];
        }
        else {
            return connections[idx + 1];
        }
    }

    getPreviousConnection = props => {
        const { selectedConnectionId, connections } = props;
        if (selectedConnectionId == null) {
            return null;
        }
        const idx = connections.findIndex(x => x.id === selectedConnectionId);
        if (idx === 0) {
            return connections[connections.length - 1];
        }
        else {
            return connections[idx - 1];
        }
    }



    getPreviousNodeFromConnection = props => {
        const { connections, selectedConnectionId } = props;

        const idx = connections.findIndex(x => x.id === selectedConnectionId);
        if (idx === 0) {
            return { nodeType: nodeTypes.CONNECTION, node: connections[connections.length - 1] };
        }
        return { nodeType: nodeTypes.CONNECTION, node: connections[idx - 1] };
    }


    getPreviousNodeFromDb = props => {
        const {  dbs, selectedDbId, } = props;
        const idx = dbs.findIndex(x => x.id === selectedDbId);
        if (idx === 0) {
            return { nodeType: nodeTypes.CONNECTION, node: this.getSelectedConnection(props) };
        }
        return { nodeType: nodeTypes.DB, node: dbs[idx - 1] };

    }

    getPreviousNodeFromKey = props => {
        const {  keys, selectedKeyId} = props;

        const idx = keys.findIndex(x => x.id === selectedKeyId);
        if (idx === 0) {          
            return { nodeType: nodeTypes.DB, node: this.getSelectedDb(props) };
        }
        return { nodeType: nodeTypes.KEY, node: keys[idx - 1] };

    }


    getNextNodeFromConnection = props => {
        const { dbs } = props;
        let conn = this.getSelectedConnection(props);
        if (conn == null) {
            return null;
        }
        else {
            const { connectionState, isExpand } = conn;
            if (connectionState === connectionStates.CONNECTED && dbs.length > 0 && isExpand === true) {
                return { nodeType: nodeTypes.DB, node: dbs[0] };
            }
            return { nodeType: nodeTypes.CONNECTION, node: this.getNextConnection(props) };
        }
    }

    getNextNodeFromDb = props => {
        const { dbs, selectedDbId, keys } = props;
        if (dbs.length === 0 || selectedDbId == null) {
            return null;
        }

        const selectedDb = this.getSelectedDb(props);
        if (selectedDb.dbState === dbStates.KEY_LOAD_SUCCESS && keys.length > 0 && selectedDb.isExpand === true) {
            return { nodeType: nodeTypes.KEY, node: keys[0] };
        }
        const idx = dbs.findIndex(x => x.id === selectedDbId);
        if (idx === dbs.length - 1) {
            return { nodeType: nodeTypes.CONNECTION, node: this.getNextConnection(props) };
        }
        return { nodeType: nodeTypes.DB, node: dbs[idx + 1] };
    }

    getNextNodeFromKey = props => {
        const { selectedConnectionId, selectedDbId, selectedKeyId, keys, dbs, connections } = props;
        if (keys.length === 0 || selectedKeyId == null) {
            return null;
        }
        const idx = keys.findIndex(x => x.id === selectedKeyId);
        if (idx < keys.length - 1) { //如果当前key还有他的兄弟key并且不是最后一个则处理
            return { nodeType: nodeTypes.KEY, node: keys[idx + 1] };
        }
        //如果是最后一个key则要处理下个是connection或者db
        const dbIdx = dbs.findIndex(x => x.id === selectedDbId);
        if (dbIdx === dbs.length - 1) {
            const connIdx = connections.findIndex(x => x.id === selectedConnectionId);
            if (connIdx === connections.length - 1) {
                return { nodeType: nodeTypes.CONNECTION, node: connections[0] };
            }
            else {
                return { nodeType: nodeTypes.CONNECTION, node: connections[connIdx + 1] };
            }

        }
        return { nodeType: nodeTypes.DB, node: dbs[dbIdx + 1] };

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


export const locator = new Locator();