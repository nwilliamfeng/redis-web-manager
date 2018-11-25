
import styled from 'styled-components'
 

export const LiIcon=styled.img`
    max-width:16px;
    max-height:16px;
    margin:1px 5px 1px 0px;
`


export const Ul = styled.ul`
    list-style: none;
  
    width:100%;`

export const Li = styled.li`
   
   
    outline:none;
    text-align:left;
    /* padding-left:15px; */
    margin-left:-40px;
   
    /* background-color:${props => props.isSelected ? '#C4C4C5' : 'transparent'};
    &:hover{
        background-color: #DEDBDA;
    };
    color: gray; */
`


// export const NameDiv=styled.div`
//     overflow:hidden;
//     text-overflow:ellipsis;
//     white-space:nowrap;
// `

export const NameDiv=styled.div`
    overflow:hidden;
    text-overflow:ellipsis;
    white-space:nowrap;
`

export const FlexDiv=styled.div`
    display:flex;
    padding:5px 0px;
    overflow:hidden;
    text-overflow:ellipsis;
    white-space:nowrap;
    cursor:default;
`
