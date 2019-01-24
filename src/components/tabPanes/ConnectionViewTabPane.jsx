import React, { Component } from 'react'
import { connect } from 'react-redux'
import { nodeTypes, } from '../../constants'
import {locator} from '../../utils'
import {ConnectionChart} from './ConnectionChart'

class ConnectionViewTabPane extends Component {

    shouldComponentUpdate(nextProps, nextState, nextContext) {
        if (nextProps == null) {
            return false;
        }
        const { selectedNodeType, selectedConnectionId,visible  } = nextProps;
        if (this.props.visible !== visible) {
            return true
        }
        if (selectedNodeType !== nodeTypes.CONNECTION) {
            return true;
        }
        return this.props.selectedConnectionId !== selectedConnectionId;    
    }


    render() {
        const { visible, selectedNodeType } = this.props;
        if (visible === false || selectedNodeType !== nodeTypes.CONNECTION) {
            return <React.Fragment />
        }


        return <div  >
            <ConnectionChart/>
        </div>
    }
}

const mapStateToProps = state => {
    return { ...state.state, ...state.connection };
}

const pane = connect(mapStateToProps)(ConnectionViewTabPane)

export { pane as ConnectionViewTabPane }