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
    constructor(props) {
        super(props);
        // this.state = { newKeyId: null, newKeyValue: null }
    }

    // componentDidMount() {
    //     const { dispatch, selectedKeyId } = this.props;
    //     if (selectedKeyId != null) {
    //         dispatch(keyActions.setSaveHandle(this.getSaveHandle));
    //     }

    // }

    setSaveHandle = saveHandle => {
        const { dispatch } = this.props;
        dispatch(keyActions.setSaveHandle(saveHandle));
    }

    // getSaveHandle = () => {
    //     const { newKeyId, newKeyValue } = this.state;
    //     const { dispatch, selectedKeyBody } = this.props;
    //     const redisKey = commandHelper.getSelectedKey(this.props);
    //     const { key, type, connectionName, dbId, dbIdx } = redisKey;
    //     switch (type) {
    //         case keyType.STRING:
    //             if (newKeyValue != null || newKeyId != null) {
    //                 if (newKeyId != null) {
    //                     const pValue = newKeyValue ? newKeyValue : selectedKeyBody;
    //                     dispatch(keyActions.modifyStringKey(connectionName, dbIdx, dbId, commandHelper.getKeyTypeValue(type), newKeyId, pValue, key));
    //                 }
    //                 else {
    //                     dispatch(keyActions.modifyStringKey(connectionName, dbIdx, dbId, commandHelper.getKeyTypeValue(type), key, newKeyValue));
    //                 }
    //             }

    //             break;
    //         default:
    //             break;
    //     }

    // }



    handleKeyIdChange = newKeyId => {
        this.setState({ newKeyId })
    }

    handleKeyValueChange = newKeyValue => {
        this.setState({ newKeyValue })
    }

    // clearState = () => {
    //     this.setState({ newKeyId: null, newKeyValue: null });
    // }

    // componentWillReceiveProps(nextProps, nextContext) {



    //     if (nextProps == null) {
    //         return;
    //     }
    //     const { selectedKeyId, selectedNodeType } = nextProps;
    //     if (selectedNodeType !== nodeTypes.KEY) {
    //         this.clearState();

    //     }
    //     if (this.props.selectedKeyId === selectedKeyId) {
    //         this.clearState();

    //     }
    //     const nxtKey = commandHelper.getSelectedKey(nextProps);
    //     const currKey = commandHelper.getKey(this.props, this.props.selectedKeyId);
    //     if (nxtKey == null || currKey == null) {
    //         this.clearState();

    //     }
    //     if (nxtKey.type === currKey.type) {
    //         this.clearState();
    //         return;
    //     }
    //   //  const { dispatch } = this.props;
    //  //   dispatch(keyActions.setSaveHandle(this.getSaveHandle));

    // }

    shouldComponentUpdate(nextProps, nextState, nextContext) {
        if (nextProps == null) {
            return false;
        }
        const { selectedNodeType, selectedKeyId } = nextProps;
        if (selectedNodeType !== nodeTypes.KEY) {
            return false;
        }
        return this.props.selectedKeyId !== selectedKeyId;
    }

    render() {
        console.log('render kvtabpane');
        const { dispatch, selectedNodeType, selectedKeyBody } = this.props;
        if (selectedNodeType !== nodeTypes.KEY) {
            return <React.Fragment />
        }
        const redisKey = commandHelper.getSelectedKey(this.props);
        if (redisKey == null) {
            return <React.Fragment />
        }
        switch (redisKey.type) {
            case keyType.STRING:
                return <StringKeyView dispatch={dispatch} setSaveHandle={this.setSaveHandle} redisKey={{ ...redisKey, value: selectedKeyBody }} onKeyChange={this.handleKeyIdChange} onValueChange={this.handleKeyValueChange} />

            case keyType.HASH:
                return <HashKeyView redisKey={{ ...redisKey, hashBody: selectedKeyBody }} onKeyChange={this.handleKeyIdChange} onValueChange={this.handleKeyValueChange} />

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