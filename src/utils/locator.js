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

    // getNextNode = props => {
    //     const {selectedNodeType,dbs } = props;
    //     if(selectedNodeType===nodeTypes.CONNECTION){
    //        let conn =this.getSelectedConnection(props);
    //        if(conn==null){
    //            return null;
    //        }
    //        else{
    //            const {connectionState} =conn;
    //            if(connectionState===connectionStates.CONNECTED){
    //                return {nodeType:dbs.length>0?nodeTypes.DB:nodeTypes.CONNECTION, node: dbs.length>0? dbs[0] : this.getNextConnection(props)};
    //            }
    //        }
    //     }
    //     else if (selectedNodeType===nodeTypes.DB){
    //         const db=this.getNextDB(props);
    //       return  {nodeType:db!=null?nodeTypes.DB:nodeTypes.CONNECTION, node: dbs.length>0? dbs[0] : this.getNextConnection(props)};
    //     }

    // }

    getNextNodeFromConnection = props => {
        const { dbs,isSelectedConnectionExpanded } = props;
        let conn = this.getSelectedConnection(props);
        if (conn == null) {
            return null;
        }
        else {
            const { connectionState } = conn;
            if (connectionState === connectionStates.CONNECTED && dbs.length > 0 && isSelectedConnectionExpanded===true) {
                return { nodeType: nodeTypes.DB, node: dbs[0] };
            }
            return { nodeType: nodeTypes.CONNECTION, node: this.getNextConnection(props) };
        }
    }

    getNextNodeFromDb = props => {
        const { dbs, selectedDbId, keys ,isSelectedDbExpanded} = props;
        if (dbs.length === 0 || selectedDbId == null) {
            return null;
        }

        const selectedDb=this.getSelectedDb(props);
        if(selectedDb.dbState===dbStates.KEY_LOAD_SUCCESS && keys.length>0 && isSelectedDbExpanded===true){
            return { nodeType: nodeTypes.KEY, node: keys[0] };
        }
        const idx = dbs.findIndex(x => x.id === selectedDbId);
        if(idx===dbs.length-1){
            return { nodeType: nodeTypes.CONNECTION, node:this.getNextConnection(props)};
        }
        return { nodeType: nodeTypes.DB, node:dbs[idx + 1]};
        
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