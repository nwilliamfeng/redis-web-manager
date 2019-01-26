import React, { Component } from 'react';
import { random } from 'lodash'
import styled from 'styled-components'
import { VictoryChart, VictoryGroup,  VictoryArea, VictoryAxis } from 'victory'
import { Observable } from 'rx'

const Div=styled.div`
    padding:10px;
`

const Header=styled.div`
    display:flex;
    padding:18px 0px 0px 20px;
`
const Rect=styled.div`
    margin-left:10px;
    margin-right:30px;
    width:40px;
    height:18px;
    background:${props=>props.fill?props.fill:'transparent'};
`

export class ConnectionChart extends Component {
    constructor(props) {
        super(props);
        this.state = { cpu: [] }
    }

    componentDidMount() {
        this._subscribe = Observable.interval(1000).subscribe(() => {
            let cpu = this.state.cpu;
            if (cpu.length === 60) {
                const [first, ...others] = cpu;
                cpu = [...others];
            }
            const newCpu = { y: random(1, 100), x: new Date() }
            this.setState({ cpu: [...cpu, newCpu] });
        });
    }

    componentWillUnmount() {
        this._subscribe.dispose();
    }


    render() {
        const { cpu, } = this.state;
        return (
            <Div>
                <Header>
                    {'CPU: '}
                    <Rect fill={'cyan'}/>
                    {'内存: '}
                    <Rect fill={'magenta'}/>
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



                        <VictoryArea
                            style={{
                                data: { fill: "cyan", stroke: "cyan", },
                                tickLabels: { fontSize: 4, },
                            }}
                            // labels={(d) => `${d.y}%`}
                            data={cpu}
                        />
                        {/* <VictoryArea
                        style={{
                            data: { fill: "magenta", stroke: "magenta" }
                        }}
                        data={[
                            { x: 1, y: 3 },
                            { x: 2, y: 2 },
                            { x: 3, y: 6 },
                            { x: 4, y: 2 },
                            { x: 5, y: 6 }
                        ]}
                    /> */}
                    </VictoryGroup>
                </VictoryChart>
            </Div>

        );
    }
}
