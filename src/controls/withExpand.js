import React, { Component } from 'react'
import styled from 'styled-components'
import {FlexDiv} from './parts'
 
const HoverSvg=styled.svg`
   &:hover{
      fill:black;
   }
   fill:#707070;
`

const ArrowDiv = styled.div`  
    width:18px;
    padding-top:3px;
    color:gray;
 `

 const ArrowDownIcon=({width=16,height=16,viewBox='0 0 1257 1024'})=><HoverSvg  viewBox={viewBox}   width={width} height={height}><path d="M478.31207 644.159081C502.692194 671.061286 542.819471 670.698193 566.819471 643.269621L837.388303 334.048098C845.146852 325.181184 844.248346 311.703582 835.381431 303.94503 826.514517 296.186481 813.036915 297.084988 805.278364 305.951902L534.709532 615.173423C527.507586 623.40422 517.168621 623.497773 509.927514 615.507586L229.141056 305.674253C221.229163 296.943889 207.737949 296.280386 199.007586 304.192277 190.277222 312.104171 189.61372 325.595383 197.525612 334.325747L478.31207 644.159081Z" ></path></HoverSvg>

 const ArrowRightIcon=({width=16,height=16,viewBox='0 0 1257 1024'})=><HoverSvg  viewBox={viewBox} width={width} height={height}><path d="M642.174253 504.59418C650.164439 511.835287 650.070886 522.174253 641.84009 529.376198L332.618569 799.94503C323.751654 807.703582 322.853148 821.181184 330.611697 830.048098 338.370249 838.915012 351.847851 839.813519 360.714765 832.05497L669.936288 561.486138C697.36486 537.486138 697.727953 497.358861 670.825747 472.978737L360.992414 192.192278C352.26205 184.280386 338.770837 184.943889 330.858944 193.674252 322.947053 202.404616 323.610556 215.895829 332.340919 223.807723L642.174253 504.59418Z"  ></path></HoverSvg>

export const withExpand = WrapperComponent => class extends Component {
    handleClick = () => {
        const { isExpand, handleExpand } = this.props;
        if (handleExpand != null) {
            handleExpand(!isExpand);
        }
    }
    render() {
        const { isExpand, hasChilds } = this.props;
        return <FlexDiv  >
            <ArrowDiv onClick={this.handleClick}>
                {hasChilds === true && <React.Fragment>{isExpand === true ? <ArrowDownIcon /> : <ArrowRightIcon />} </React.Fragment>}
            </ArrowDiv>
            <WrapperComponent {...this.props} />
        </FlexDiv>
    }
}
