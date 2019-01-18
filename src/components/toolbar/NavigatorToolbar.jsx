import React, { Component } from 'react'
import { imgSrc } from '../imgSrc'
import { connect } from 'react-redux'
import { moveToParentNodeCommand } from '../commands'
import { ToolbarButton, ButtonDiv } from './part'



class NavigatorToolbar extends Component {

    handleMoveToParentClick = () => moveToParentNodeCommand(this.props).execute();

    canMoveToParent = () => moveToParentNodeCommand(this.props).canExecute();



    render() {
        return <ButtonDiv style={{maxWidth:55}}>
            <ToolbarButton title='返回'   height={'16px'} width={'16px'} backgroundImage={imgSrc.PREVIOUS_IMG}></ToolbarButton>
            <ToolbarButton title='返回上级' disabled={!this.canMoveToParent()} onClick={this.handleMoveToParentClick} height={'16px'} width={'16px'} backgroundImage={imgSrc.UP_IMG}></ToolbarButton>

        </ButtonDiv>
    }
}


const mapStateToProps = state => {
    return { ...state.key, ...state.db, ...state.connection, ...state.state };
}

const toolbar = connect(mapStateToProps)(NavigatorToolbar)

export { toolbar as NavigatorToolbar }