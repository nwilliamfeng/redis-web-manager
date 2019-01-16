import React, { Component } from 'react'
import { connect } from 'react-redux'
import {ContextMenuTrigger,ContextMenu,MenuItem,connectMenu} from 'react-contextmenu';
 

const MENU_TYPE = 'DYNAMIC';

const targets = [{
    name: 'Banana'
}, {
    name: 'Apple'
}, {
    name: 'Papaya'
}, {
    name: 'Mango'
}, {
    name: 'Orange'
}, {
    name: 'Pineapple'
}];

function collect(props) {
    return props;
}

const DynamicMenu = (props) => {
    const { id, trigger } = props;
    const handleItemClick = trigger ? trigger.onItemClick : null;

    return (
        <ContextMenu id={id}>
            {trigger && <MenuItem onClick={handleItemClick} data={{ action: 'Added' }}>{`Add 1 ${trigger.name}`}</MenuItem>}
            {trigger && (
                trigger.allowRemoval2
                    ? <MenuItem onClick={handleItemClick} data={{ action: 'Removed' }}>{`Remove 1 ${trigger.name}`}</MenuItem>
                    : <MenuItem disabled>{'Removal disabled'}</MenuItem>
            )}
        </ContextMenu>
    );
};


const ConnectedMenu = connectMenu(MENU_TYPE)(DynamicMenu);

 class SettingTabPane extends Component {
    constructor(props) {
        super(props);

        this.state = { logs: [] };
    }

    handleClick = (e, data, target) => {
        const count = parseInt(target.getAttribute('data-count'), 10);

        if (data.action === 'Added') {
            target.setAttribute('data-count', count + 1);

            return this.setState(({ logs }) => ({
                logs: [`${data.action} 1 ${data.name}`, ...logs]
            }));
        }
        if (data.action === 'Removed' && count > 0) {
            target.setAttribute('data-count', count - 1);

            return this.setState(({ logs }) => ({
                logs: [`${data.action} 1 ${data.name}`, ...logs]
            }));
        }
        return this.setState(({ logs }) => ({
            logs: [` ${data.name} cannot be ${data.action.toLowerCase()}`, ...logs]
        }));
    }

    render() {
        const attributes = {
            'data-count': 0,
            className: 'example-multiple-targets well'
        };

        return (
            <div>
               {'to be continued'}
         
            </div>
        );
    }
}

const mapStateToProps = state => {
    return { ...state.state,  };
}

const pane = connect(mapStateToProps)(SettingTabPane)

export { pane as SettingTabPane }