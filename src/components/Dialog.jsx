import React, { Component } from 'react';
import { connect } from 'react-redux';
import { dialogConstants } from '../constants'
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'
import Popup from 'reactjs-popup'
import { dialogAction } from '../actions';


const contentStyle =  {
    maxWidth: '45%',
    minWidth: '20%',
    width:'auto',
    height:'auto',
    maxHeight: '45%',
    minHeight: '20%',
    borderRadius: 2,
    display: 'flex',
    flexDirection: 'column',
    textAlign:'left',
    padding:0,
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
    padding:12px 10px;
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

const FootbarDiv = styled.div`
    display:flex;
    justify-content:flex-end;
    align-items:center;
    padding:12px 10px;
  
`

const footButtonStyle = {
    paddingTop: 2,
    height: 24,
    paddingBottom: 4,
    marginLeft: 8,
}


class Dialog extends Component {

    renderConfirmDialogBody = () => {
        const { renderContent } = this.props;
        return <React.Fragment>
            <ContentDiv>
                {renderContent && renderContent()}
            </ContentDiv>
            <FootbarDiv>
                <button style={footButtonStyle} onClick={this.handleConfirmClick} className="btn btn-primary">{'确定'}</button>
                <button style={footButtonStyle} onClick={this.handleCloseClick} className="btn btn-default">{'取消'}</button>
            </FootbarDiv>
        </React.Fragment>
    }

    renderFormDialogBody = () => {
        const { renderForm } = this.props;
        return <React.Fragment>
            {renderForm && renderForm()}
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
        const { dialogType, title } = this.props;

        return <Popup
            open={dialogType !== dialogConstants.NONE}
            contentStyle={contentStyle }
            closeOnDocumentClick={false}
            onClose={this.handleClose}
        >
            <React.Fragment>
                <TitlebarDiv>
                    {title}
                    <CloseIconDiv title='关闭' onClick={this.handleCloseClick}>
                        <FontAwesomeIcon icon={faTimes} />
                    </CloseIconDiv>
                </TitlebarDiv>
                {dialogType === dialogConstants.OPEN_CONFIRM_DIALOG && this.renderConfirmDialogBody()}
                {dialogType === dialogConstants.OPEN_FORM_DIALOG && this.renderFormDialogBody()}
            </React.Fragment>

        </Popup>

    }
}


const mapStateToProps = state => {
    // const state=state.shell
    return { ...state.dialog };
}

const dialog = connect(mapStateToProps)(Dialog);

export { dialog as Dialog };