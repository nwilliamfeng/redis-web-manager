import React, { Component } from 'react'
import { connect } from 'react-redux'
import { commandHelper, compositSaveCommand } from '../commands'
import { nodeTypes, keyType } from '../../constants'
import { StringKeyView } from './StringKeyView'
import { keyActions } from '../../actions';
import { AggregateKeyView } from './AggregateKeyView'


class KeyViewTabPane extends Component {

    setSaveHandle = saveHandle => {
        const { dispatch } = this.props;
        dispatch(keyActions.setSaveHandle(saveHandle));
    }

    shouldComponentUpdate(nextProps, nextState, nextContext) {
        if (nextProps == null) {
            return false;
        }
        const { selectedNodeType, selectedKeyId, isKeyDirty, visible,selectedkeyContent } = nextProps;
        if (this.props.visible !== visible) {
            return true
        }
        if (selectedNodeType !== nodeTypes.KEY) {
            return true;
        }
        if (this.props.isKeyDirty !== isKeyDirty) {
            return true;
        }
        if (this.props.selectedKeyId !== selectedKeyId){
            return true;
        }
        return this.props.selectedkeyContent !==selectedkeyContent;
    }


    renderView = redisKey => {
        const { dispatch, selectedkeyContent, isKeyDirty } = this.props;

        switch (redisKey.type) {
            case keyType.STRING:
                return <StringKeyView dispatch={dispatch} isKeyDirty={isKeyDirty} setSaveHandle={this.setSaveHandle} redisKey={{ ...redisKey, content: selectedkeyContent }} />

            case keyType.HASH:
            case keyType.ZSET:
            case keyType.LIST:
            case keyType.SET:
                return <AggregateKeyView dispatch={dispatch} isKeyDirty={isKeyDirty} redisKey={{ ...redisKey, content: selectedkeyContent }} setSaveHandle={this.setSaveHandle} />

            default:
                return <React.Fragment />
        }

    }


    handleKeyDown=e=>{
        if (e.ctrlKey === true && (e.key === 's' || e.key === 'S')) {
            const cmd = compositSaveCommand(this.props);
            if (cmd.canExecute()) {
                cmd.execute();
            }
            e.preventDefault();
        }
    }

    componentDidMount(){
        window.addEventListener('keydown',this.handleKeyDown);
    }

    componentWillUnmount(){
        window.removeEventListener('keydown',this.handleKeyDown);
    }

    render() {

        console.log('render kvtabpane');
        const { visible, selectedNodeType } = this.props;
        if (visible === false || selectedNodeType !== nodeTypes.KEY) {
            return <React.Fragment />
        }

        const redisKey = commandHelper.getSelectedKey(this.props);
        if (redisKey == null) {
            return <React.Fragment />
        }

        return <div  style={{ height: '100%' }} >
            {this.renderView(redisKey)}
        </div>
    }
}

const mapStateToProps = state => {
    return { ...state.state, ...state.key };
}

const pane = connect(mapStateToProps)(KeyViewTabPane)

export { pane as KeyViewTabPane }