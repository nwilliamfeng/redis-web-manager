import styled from 'styled-components'
import React from 'react'


const ErrorDiv = styled.div`
    color: red;
`

const Div = styled.div`
    display:flex;
    align-items:center;
    justify-content:center;
    margin-bottom:10px;
`
const Label = styled.label`
    text-align:right;
    max-width:180px;
    width:150px;
`

export const TextInput = ({ type, id, label, error, value, onChange, ...props }) => {
    return <Div >
        <Label > {label}  </Label>
        <div style={{ width: '100%', marginLeft: 10 }}>
            <input
                id={id}
                className={'form-control'}
                style={{ borderRadius: 1, width: '100%',padding:'2px 5px',fontSize:13 }}
                type={type}
                value={value}
                onChange={onChange}
                {...props}

            />
            {error && <ErrorDiv>{error}</ErrorDiv>}
        </div>
    </Div>
}

export const Select = ({ type, id, label, error, value, onChange, ...props }) => {
    return <Div >
        <Label > {label}  </Label>
        <div style={{ width: '100%', marginLeft: 10 }}>
            <select
                id={id}
                className={'form-control'}
                style={{ borderRadius: 1, width: '100%',padding:3,fontSize:13 }}
                type={type}
                value={value}
                onChange={onChange}
                {...props}>
            <option value={'string'}>string</option>
            <option value={'Num'}>num</option>
            </select>

            {error && <ErrorDiv>{error}</ErrorDiv>}
        </div>
    </Div>
}