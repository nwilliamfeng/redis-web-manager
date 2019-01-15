import { nodeTypes } from '../constants'
import { commandHelper} from '../components/commands'

export const navigateAction = {
    multiSelect,
}

function selectByArrowUp(props) {

    return { type: multiNodeConstants.MULTI_SELECT, nodes };
}

function selectByArrowDown(props) {
    const { selectedNodeType } = props;
    switch (selectedNodeType) {
        case nodeTypes.CONNECTION:
            const connection = commandHelper.getSelectedConnection(props);
            if(connection!=null){
                
            }
            break;
        case nodeTypes.DB:
    
            break;
        case nodeTypes.KEY:

    }
    return { type: multiNodeConstants.MULTI_SELECT, nodes };
}

