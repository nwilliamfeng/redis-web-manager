import React, { Component } from 'react'
import {keyEventUtil} from '../utils'

export class TextArea extends Component {

    constructor(props){
        super(props);
        this.state={value:props.value};
        
    }
    
    keyHandle = e => {
        const {onValueChange}=this.props;
        e.stopPropagation();
        if(keyEventUtil.checkCtrl(e)){
            return ;
        }
        if(onValueChange!=null){
            onValueChange(this.input.value);
        }
        
    }

    componentWillReceiveProps(nextProps,nextContext){
        if(nextProps!=null){
            if(this.state.value!==nextProps.value){
                this.setState({value:nextProps.value})
            }
        }
    }

    handleChange=e=>{
        this.setState({value: e.target.value });
    }

    render() {
        const {  style, placeholder,readOnly } = this.props;
        return <textarea ref={el => this.input = el} 
        className='form-control' 
        value={this.state.value}  
        readOnly={readOnly}
        onChange={this.handleChange} 
        
        onKeyUp={this.keyHandle} 
        style={style} 
        placeholder={placeholder} />
    }
}