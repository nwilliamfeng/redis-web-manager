import React, { Component } from 'react'
import { connect } from 'react-redux'
import { commandHelper } from '../commands'
import { nodeTypes, keyType } from '../../constants'
import { StringKeyView } from './StringKeyView'
import { keyActions } from '../../actions';
import { HashKeyView } from './HashKeyView'


// const StringKeyFrom = ({ redisKey,  dispatch ,errorMessage}) => {
//     console.log(redisKey);
//     const { connectionName, dbIdx, key, type,value,dbId } = redisKey;
//     const form = attachMessage => {
//         return <ModifyStringKeyPostForm formKey={{id:key,type,value}} dbIdx={dbIdx} dbId={dbId}
//             dispatch={dispatch} connectionName={connectionName} attachMessage={attachMessage} />
//     }
//     return form(errorMessage);
// }

// const form = attachMessage => {
//     return <ModifyStringKeyPostForm redisKey={redisKey} dbIdx={dbIdx} dbId={dbId}
//         dispatch={dispatch} connectionName={connectionName} attachMessage={attachMessage} />
// }


class KeyViewTabPane extends Component {
   
    setSaveHandle = saveHandle => {
        const { dispatch } = this.props;
        dispatch(keyActions.setSaveHandle(saveHandle));
    }

    shouldComponentUpdate(nextProps, nextState, nextContext) {
        if (nextProps == null) {
            return false;
        }
        const { selectedNodeType, selectedKeyId,isKeyDirty } = nextProps;
        if (selectedNodeType !== nodeTypes.KEY) {
            return false;
        }
        if(this.props.isKeyDirty!==isKeyDirty ){
            return true;
        }
        return this.props.selectedKeyId !== selectedKeyId;
    }

    render() {
        console.log('render kvtabpane');
        const { dispatch, selectedNodeType, selectedkeyContent,isKeyDirty } = this.props;
        if (selectedNodeType !== nodeTypes.KEY) {
            return <React.Fragment />
        }
        const redisKey = commandHelper.getSelectedKey(this.props);
        if (redisKey == null) {
            return <React.Fragment />
        }
        switch (redisKey.type) {
            case keyType.STRING:
                return <StringKeyView dispatch={dispatch} isKeyDirty={isKeyDirty} setSaveHandle={this.setSaveHandle} redisKey={{ ...redisKey, content: selectedkeyContent }}  />

            case keyType.HASH:
                return <HashKeyView dispatch={dispatch} isKeyDirty={isKeyDirty} redisKey={{ ...redisKey, content: selectedkeyContent }} setSaveHandle={this.setSaveHandle}  />

            default:
                return <React.Fragment />
        }

    }
}

const mapStateToProps = state => {
    return { ...state.state, ...state.key };
}

const pane = connect(mapStateToProps)(KeyViewTabPane)

export { pane as KeyViewTabPane }