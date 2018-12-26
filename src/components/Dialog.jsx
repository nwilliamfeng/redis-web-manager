import React, { Component } from 'react';
import { connect } from 'react-redux';
import { dialogConstants } from '../constants'
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'
import Popup from 'reactjs-popup'
import { dialogAction } from '../actions';

const getContentStyle = size => {
    return {
        maxWidth: '45%',
        minWidth: '20%',
        width: size ? size.width ? size.width : 'auto' : 'auto',
        height: size ? size.height ? size.height : 'auto' : 'auto',
        maxHeight: '45%',
        minHeight: '20%',
        borderRadius: 2,
        display: 'flex',
        flexDirection: 'column',
        textAlign: 'left',
        padding: 0,
    }
}


const CloseIconDiv = styled.div`
    color: gray;
    &:hover{
      color:red;
    }
    cursor:pointer;
    margin-left:5px;
`

const TitlebarDiv = styled.div`
    display:flex;
    padding:8px 10px;
    background:#eeee;
    justify-content:space-between;
    align-items:center;
`

const ContentDiv = styled.div`   
    height:100%;
    padding:10px;
    text-align:left;
    align-items:center;
`


class Dialog extends Component {

    renderConfirmDialogBody = () => {
        const { renderContent } = this.props;
        return <React.Fragment>
            <ContentDiv>
                {renderContent && renderContent()}
            </ContentDiv>
         
        </React.Fragment>
    }

    renderFormDialogBody = message => {
        const { renderForm } = this.props;
        return <React.Fragment>
            {renderForm && renderForm(message)}
        </React.Fragment>
    }

    handleCloseClick = () => {
        const { dispatch } = this.props;
        dispatch(dialogAction.closeDialog());
    }

    handleConfirmClick = () => {
        const { onConfirm } = this.props;
        this.handleCloseClick();
        if (onConfirm != null) {
            onConfirm();
        }
    }

    handleClose = () => {
        //处理esc按键
        const { dialogType, } = this.props;
        if (dialogType !== dialogConstants.NONE) {
            this.handleCloseClick();
        }

    }

    render() {
        const { dialogType, title, size, attachMessage } = this.props;
        return <Popup open={dialogType !== dialogConstants.NONE} contentStyle={getContentStyle(size)} closeOnDocumentClick={false} onClose={this.handleClose}>
            <React.Fragment>
                <TitlebarDiv>
                    {title?title:'提醒'}
                    <CloseIconDiv title='关闭' onClick={this.handleCloseClick}>
                        <FontAwesomeIcon icon={faTimes} />
                    </CloseIconDiv>
                </TitlebarDiv>
                {(dialogType === dialogConstants.OPEN_CONFIRM_DIALOG || dialogType === dialogConstants.SHOW_ERROR) && this.renderConfirmDialogBody()}
                {dialogType === dialogConstants.OPEN_FORM_DIALOG && this.renderFormDialogBody(attachMessage)}            
            </React.Fragment>
        </Popup>
    }
}


const mapStateToProps = state => {
    return { ...state.dialog };
}

const dialog = connect(mapStateToProps)(Dialog);

export { dialog as Dialog };