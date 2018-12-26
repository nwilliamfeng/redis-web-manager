import React from 'react'

const footButtonStyle = {
    paddingTop: 4,
   
    paddingBottom: 4,
    marginLeft: 8,
}

/**
 * 确认按钮
 * @param {*} param0 
 */
export const ConfirmButton=({onConfirm})=> <button style={footButtonStyle} onClick={onConfirm} className="btn btn-primary">{'确定'}</button>
