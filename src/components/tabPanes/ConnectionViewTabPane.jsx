import React, { Component } from 'react'
import { connect } from 'react-redux'
import { nodeTypes, } from '../../constants'
import styled from 'styled-components'
import { VictoryChart, VictoryGroup, VictoryArea, VictoryAxis } from 'victory'
import { Observable } from 'rx'
import { connectionActions } from '../../actions';

const Div = styled.div`
    padding:10px;
`

const Header = styled.div`
    display:flex;
    padding:18px 0px 0px 30px;
`
const Rect = styled.div`
    margin-left:10px;
    margin-right:30px;
    width:40px;
    height:18px;
    background:${props => props.fill ? props.fill : 'transparent'};
`

const CPUAreaStyle={
    data: { fill: "cyan", stroke: "cyan", },
    tickLabels: { fontSize: 4, },
}

const MemoryAreaStyle={
    data: { fill: "magenta", stroke: "magenta", },
    tickLabels: { fontSize: 4, },
}

class ConnectionViewTabPane extends Component {

    constructor(props) {
        super(props);
        this.state = { cpu: [] ,memory:[]}
    }

    componentDidMount() {
     
        this._subscribe = Observable.interval(1000).subscribe(() => {
            const {visible, dispatch, selectedConnectionId } = this.props;
            if (visible && selectedConnectionId != null) {
                dispatch(connectionActions.getConnectionInfo(selectedConnectionId));
            }
        });
    }

    componentWillReceiveProps(nextProps, nextContext) {
        const {selectedConnectionId}=this.props;
        if(nextProps.selectedConnectionId!==selectedConnectionId){
            this.setState({cpu:[],memory:[]   });
            return;
        }
        const { selectedConnectionCpuUsage, selectedConnectionMemoryUsage } = nextProps;
        const cpu=this.getNewInfoArray(this.state.cpu,selectedConnectionCpuUsage);
        const memory=this.getNewInfoArray(this.state.memory,selectedConnectionMemoryUsage)
        this.setState({cpu,memory   });
    }

    getNewInfoArray=(usages=[],nwValue)=>{
        if (usages.length === 60) {
            const [first, ...others] = usages;
            usages = [...others];
        }
        return [...usages,  { y: nwValue, x: new Date() }];
    }
  

    renderChart = () => {
        const { cpu,memory } = this.state;
        return <Div>
            <Header>
                {'CPU: '}
                <Rect fill={'cyan'} />
                {'内存: '}
                <Rect fill={'magenta'} />
            </Header>
            <VictoryChart domain={{ y: [0, 100] }} >
                <VictoryAxis
                    label='利用率%'
                    style={{
                        axis: { stroke: 'lightgray' },
                        axisLabel: { fontSize: 8, fill: 'gray' },
                        ticks: { stroke: '#ccc' },
                        tickLabels: { fontSize: 8, fill: 'gray', },
                        grid: { stroke: '#B3E5FC', strokeWidth: 0.25 }
                    }} dependentAxis
                />
                <VictoryAxis
                    label='60秒'
                    style={{
                        axis: { stroke: 'lightgray' },
                        axisLabel: { fontSize: 8, fill: 'gray' },
                        ticks: { stroke: 'gray' },
                        tickLabels: { fontSize: 0, }
                    }}
                />
                <VictoryGroup style={{
                    data: { strokeWidth: 3, fillOpacity: 0.4 },
                }} >
                    <VictoryArea style={CPUAreaStyle}  data={cpu} />
                    <VictoryArea style={MemoryAreaStyle}  data={memory} />               
                </VictoryGroup>
            </VictoryChart>
        </Div>
    }


    render() {
        const { visible, selectedNodeType } = this.props;
        if (visible === false || selectedNodeType !== nodeTypes.CONNECTION) {
            return <React.Fragment />
        }


        return this.renderChart();
    }
}

const mapStateToProps = state => {
    return { ...state.state, ...state.connection };
}

const pane = connect(mapStateToProps)(ConnectionViewTabPane)

export { pane as ConnectionViewTabPane }