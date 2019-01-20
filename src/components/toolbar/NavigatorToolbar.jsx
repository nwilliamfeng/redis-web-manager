import React, { Component } from 'react'
import { imgSrc } from '../imgSrc'
import { connect } from 'react-redux'
import { moveToParentNodeCommand,backwardNodeCommand } from '../commands'
import { ToolbarButton, ButtonDiv } from './part'
import { connectionActions } from '../../actions';



class NavigatorToolbar extends Component {

    componentDidMount(){
        this.props.dispatch(connectionActions.selectRoot());
    }

    handleMoveToParentClick = () => moveToParentNodeCommand(this.props).execute();

    canMoveToParent = () => moveToParentNodeCommand(this.props).canExecute();

    handlBackwardClick = () => backwardNodeCommand(this.props).execute();

    canBackward = () => backwardNodeCommand(this.props).canExecute();

    render() {
        return <ButtonDiv >
            <ToolbarButton title='返回' disabled={!this.canBackward()} onClick={this.handlBackwardClick}   height={'16px'} width={'16px'} backgroundImage={imgSrc.PREVIOUS_IMG}></ToolbarButton>
            <ToolbarButton title='返回上级' disabled={!this.canMoveToParent()} onClick={this.handleMoveToParentClick} height={'16px'} width={'16px'} backgroundImage={imgSrc.UP_IMG}></ToolbarButton>

        </ButtonDiv>
    }
}


const mapStateToProps = state => {
    return { ...state.key, ...state.db, ...state.connection, ...state.state };
}

const toolbar = connect(mapStateToProps)(NavigatorToolbar)

export { toolbar as NavigatorToolbar }