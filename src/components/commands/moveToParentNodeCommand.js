import { locator } from '../../utils'
import { refreshConnectionCommand, refreshConnectionsCommand } from './connection'
import { dbStates, connectionStates, nodeTypes } from '../../constants'
import { refreshDbCommand } from './db'
import { connectionActions } from '../../actions';

export const moveToParentNodeCommand = props => {
    return {
        canExecute: () => {
            const { selectedNodeType } = props;
            return selectedNodeType !== nodeTypes.ROOT;
        },

        execute: () => {
            const { dispatch, selectedDbId, selectedConnectionId, selectedNodeType } = props;
            switch (selectedNodeType) {
                case nodeTypes.CONNECTION:
                    dispatch(connectionActions.selectRoot());
                    break;
                case nodeTypes.DB:
                    dispatch(connectionActions.selectConnection(selectedConnectionId));
                    break;

                default:
                    break;
            }
        },
    }
}