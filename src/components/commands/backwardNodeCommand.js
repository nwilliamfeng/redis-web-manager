import { locator, nodeHistory } from '../../utils'
import { nodeTypes } from '../../constants'
import { connectionActions, dbActions, keyActions } from '../../actions';

export const backwardNodeCommand = props => {
    return {
        canExecute: () => {
            return nodeHistory.canPop();
        },

        execute: () => {
            const { dispatch } = props;
            const node = nodeHistory.pop();
            switch (node.nodeType) {
                case nodeTypes.ROOT:
                    dispatch(connectionActions.selectRoot());
                    break;
                case nodeTypes.CONNECTION:
                    dispatch(connectionActions.selectConnection(node.nodeValue));
                    break;
                case nodeTypes.DB:
                    const { connectionId, dbId } = node.nodeValue;
                    dispatch(dbActions.selectDB(connectionId, dbId));
                    break;
                case nodeTypes.KEY:            
                      dispatch(keyActions.selectKey(node.nodeValue));
                    break;
                default:
                    break;
            }
        },
    }
}