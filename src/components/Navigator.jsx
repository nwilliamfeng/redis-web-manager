import React, { Component } from 'react'
import { connect } from 'react-redux'
import { nodeTypes } from '../constants'
import { keyActions, dbActions, connectionActions } from '../actions'
import { imgSrc } from './imgSrc'
import { Input } from '../controls'
import { commandHelper } from './commands'

const getInputvStyle = nodeType => {
    const img = nodeType === nodeTypes.KEY ? imgSrc.KEY_IMG : nodeType === nodeTypes.DB ? imgSrc.REDIS_DB_IMG : imgSrc.REDIS_IMG;
    return {
        width: '100%',
        height: 24,
        borderRadius: 0,
        paddingLeft: 25,
        backgroundImage: `url(${img})`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 14,
        backgroundPositionY: 3,
        backgroundPositionX: 3,
    }
}


class Navigator extends Component {

    constructor(props) {
        super(props);
        this.state = { path: '' };

    }

    handleKeyPress = e => {
        if (e.key === 'Enter') {
            const { path } = this.state;
            const { dispatch } = this.props;
            const strs = path.split('\\').filter(x => x !== '');
            switch (strs.length) {
                case 1:
                    dispatch(connectionActions.selectConnection(strs[0]));
                    break;
                case 2:
                    dispatch(dbActions.selectDB(strs[0],`${strs[0]}-${strs[1]}`));
                    break;
                default:
                    break;
            }
        }

    }

    handleValueChange = value => {
        this.setState({ path: value })
    }

    componentWillReceiveProps(nextProps, nextContext) {
        const nwPath = commandHelper.getFullPath(nextProps);
        this.setState({ path: nwPath ? nwPath : '' });
    }

    render() {
        const { selectedNodeType } = this.props;
        return <Input ref style={getInputvStyle(selectedNodeType)} value={this.state.path}
            onValueChange={this.handleValueChange}
            onKeyPress={this.handleKeyPress} />
    }
}

function mapStateToProps(state) {
    return { ...state.connection, ...state.db, ...state.key, ...state.state };
}

const nav = connect(mapStateToProps)(Navigator)

export { nav as Navigator }