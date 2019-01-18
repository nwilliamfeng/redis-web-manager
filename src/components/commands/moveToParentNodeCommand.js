import { locator } from '../../utils'
import {nodeTypes} from '../../constants'
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