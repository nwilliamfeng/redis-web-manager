import React, { Component } from 'react'
import { connect } from 'react-redux'
import { connectionActions } from '../actions'
import {Connection} from './Connection'
import {Ul} from '../controls/parts'
import {ContextMenus} from './ContextMenus'
 


class ConnectionList extends Component {
   
    componentDidMount() {
        const { dispatch } = this.props;
        dispatch(connectionActions.loadConnectionList());
    }

    shouldComponentUpdate(nextProps, nextState, nextContext) {
        return true;
    }

    render() {
        console.log('render connection-list');
        const { connections, dispatch } = this.props;

        return <React.Fragment>
            {connections &&
                <Ul>
                    {connections.map(x => <Connection key={x.name} item={x}/>)}
                </Ul>}
                <ContextMenus dispatch={dispatch}/>
          
        </React.Fragment>
    }
}


const mapStateToProps = state => {
    const { connections } = state.connection;
    return { connections };
}

const list = connect(mapStateToProps)(ConnectionList)

export { list as ConnectionList }


