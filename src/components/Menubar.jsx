import React,{Component} from 'react'
import {Menu}  from '../controls/Menu'

export class Menubar extends Component{
    render(){
        const menuItems=[{title:'abc',id:1,subItems:[{title:'dfsdf',id:11},{title:'sdfsd234234234f',id:12}]},{title:'5345345353535werwer',id:2,subItems:[{title:'dfsdf',id:11},{title:'sdfsdf',id:12}]},{title:'sdfsdf',id:3}]
        return  <div>
                <Menu items={menuItems}/>
            </div>
    }
}
 