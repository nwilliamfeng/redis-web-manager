import React, { Component } from 'react'
import { connect } from 'react-redux'
import { commandHelper } from '../commands'
import { nodeTypes, keyType } from '../../constants'
import {StringKeyView } from './StringKeyView'


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

    }

    // renderStringForm =( redisKey,errorMessage) => {
    //     return <StringKeyFrom dispatch={this.props.dispatch} redisKey={redisKey} errorMessage={errorMessage}/> 
    // }

    shouldComponentUpdate(nextProps, nextState, nextContext) {
        if(nextProps==null){
            return false;
        }
        const {selectedNodeType,selectedKeyId}=nextProps;
        if(selectedNodeType!==nodeTypes.KEY){
            return false;
        } 
         return this.props.selectedKeyId!==selectedKeyId;
    }

    render() {
       
        const { selectedNodeType,selectedKeyBody } = this.props;
        if (selectedNodeType !== nodeTypes.KEY) {
            return <React.Fragment />
        }
        const redisKey = commandHelper.getSelectedKey(this.props);
        if (redisKey == null) {
            return <React.Fragment />
        }
        switch (redisKey.type) {
            case keyType.STRING:
                return <StringKeyView redisKey={{...redisKey,value:selectedKeyBody}}/>
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