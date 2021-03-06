import { locator } from '../../utils'
import { nodeTypes } from '../../constants'
import { connectionActions, dbActions } from '../../actions';

export const moveToParentNodeCommand = props => {
    return {
        canExecute: () => {
            const { selectedNodeType } = props;
            return selectedNodeType !== nodeTypes.ROOT;
        },

        execute: () => {
            const { dispatch, selectedConnectionId, selectedNodeType,selectedDbId } = props;
            switch (selectedNodeType) {
                case nodeTypes.CONNECTION:
                    dispatch(connectionActions.selectRoot());
                    break;
                case nodeTypes.DB:
                    dispatch(connectionActions.selectConnection(selectedConnectionId));
                    break;
                case nodeTypes.KEY:
                    dispatch(dbActions.selectDB(selectedConnectionId,selectedDbId));
                    break;
                default:
                    break;
            }
        },
    }
}