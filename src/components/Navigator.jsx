import React, { Component } from 'react'
import { connect } from 'react-redux'
import { nodeTypes } from '../constants'
import { keyActions, dbActions, connectionActions } from '../actions'
import { imgSrc } from './imgSrc'
import { Input } from '../controls'
import { locator } from '../utils'

const getImg = nodeType => {
    switch (nodeType) {
        case nodeTypes.CONNECTION:
            return imgSrc.REDIS_IMG;
        case nodeTypes.DB:
            return imgSrc.REDIS_DB_IMG;
        case nodeTypes.ROOT:
            return imgSrc.HOME_IMG;
        case nodeTypes.KEY:
            return imgSrc.KEY_IMG;
        default:
            return null;
    }
}

const getInputvStyle = nodeType => {
    const img =  getImg(nodeType);
    return {
        width: '100%',
        height: 24,
        borderRadius: 0,
        paddingLeft: 25,
        backgroundImage: `url(${img})`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: nodeType===nodeTypes.ROOT? 16:14,
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
                    dispatch(dbActions.selectDB(strs[0], `${strs[0]}-${this.getDbIdx(strs[1])}`));
                    break;
                case 3:

                    const keyId = `${strs[0]}-${this.getDbIdx(strs[1])}-${strs[2]}`
                    const redisKey = locator.getKey(this.props, keyId);
                    dispatch(keyActions.selectKey(redisKey));
                    break;
                default:
                    break;
            }
        }

    }

    getDbIdx = dbIdxStr => {
        return dbIdxStr.length > 2 ? dbIdxStr.substring(2) : dbIdxStr;
    }

    handleValueChange = value => {
        this.setState({ path: value })
    }

    componentWillReceiveProps(nextProps, nextContext) {
        const nwPath = locator.getFullPath(nextProps);
        this.setState({ path: nwPath ? nwPath : '' });
    }

    render() {
        const { selectedNodeType } = this.props;
        return <Input style={getInputvStyle(selectedNodeType)} value={this.state.path}
            onValueChange={this.handleValueChange}
            onKeyPress={this.handleKeyPress} />
    }
}

function mapStateToProps(state) {
    return { ...state.connection, ...state.db, ...state.key, ...state.state };
}

const nav = connect(mapStateToProps)(Navigator)

export { nav as Navigator }