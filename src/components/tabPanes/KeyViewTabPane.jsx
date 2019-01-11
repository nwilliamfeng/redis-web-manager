import React, { Component } from 'react'
import { connect } from 'react-redux'
import { commandHelper, compositSaveCommand } from '../commands'
import { nodeTypes, keyType } from '../../constants'
import { StringKeyView } from './StringKeyView'
import { keyActions } from '../../actions';
import { HashKeyView } from './HashKeyView'


class KeyViewTabPane extends Component {

    setSaveHandle = saveHandle => {
        const { dispatch } = this.props;
        dispatch(keyActions.setSaveHandle(saveHandle));
    }

    shouldComponentUpdate(nextProps, nextState, nextContext) {
        if (nextProps == null) {
            return false;
        }
        const { selectedNodeType, selectedKeyId, isKeyDirty, visible } = nextProps;
        if (this.props.visible !== visible) {
            return true
        }
        if (selectedNodeType !== nodeTypes.KEY) {
            return true;
        }
        if (this.props.isKeyDirty !== isKeyDirty) {
            return true;
        }
        return this.props.selectedKeyId !== selectedKeyId;
    }


    renderView = redisKey => {
        const { dispatch, selectedkeyContent, isKeyDirty } = this.props;

        switch (redisKey.type) {
            case keyType.STRING:
                return <StringKeyView dispatch={dispatch} isKeyDirty={isKeyDirty} setSaveHandle={this.setSaveHandle} redisKey={{ ...redisKey, content: selectedkeyContent }} />

            case keyType.HASH:
                return <HashKeyView dispatch={dispatch} isKeyDirty={isKeyDirty} redisKey={{ ...redisKey, content: selectedkeyContent }} setSaveHandle={this.setSaveHandle} />

            default:
                return <React.Fragment />
        }

    }

    handleKeyDown = (e) => {
        if (e.ctrlKey === true && (e.key === 's' || e.key === 'S')) {
            const cmd = compositSaveCommand(this.props);
            if (cmd.canExecute()) {
                cmd.execute();
            }
            e.preventDefault();
        }
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

        return <div tabIndex={0} style={{ height: '100%' }} onKeyDown={this.handleKeyDown}>
            {this.renderView(redisKey)}
        </div>
    }
}

const mapStateToProps = state => {
    return { ...state.state, ...state.key };
}

const pane = connect(mapStateToProps)(KeyViewTabPane)

export { pane as KeyViewTabPane }