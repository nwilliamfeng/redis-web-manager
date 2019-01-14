import React, { Component } from 'react'
import {keyEventUtil} from '../utils'

export class Input extends Component {

    constructor(props){
        super(props);
        this.state={value:props.value};
        
    }
    
    keyHandle = e => {
     
        const {onValueChange}=this.props;
        e.stopPropagation();

        if(keyEventUtil.checkCtrl(e)){
            return;
        }
        if(onValueChange!=null ){
            onValueChange(this.input.value);
        }
        
    }

    handleKeyPress =e=>{
        if(this.props.onKeyPress!=null){
            this.props.onKeyPress(e);
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
        const {  style, placeholder,readOnly,type } = this.props;
        return <input type={type} ref={el => this.input = el} 
        className='form-control' 
        value={this.state.value}  
        readOnly={readOnly}
        onChange={this.handleChange} 
        onKeyUp={this.keyHandle} 
        onKeyPress={this.handleKeyPress}
        style={style} 
        placeholder={placeholder} />
    }
}