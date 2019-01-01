import {multiNodeConstants} from '../constants'

export const multiNodeAction={
    multiSelect,
}

function multiSelect(nodes){
    return {type:multiNodeConstants.MULTI_SELECT,nodes};
}

 