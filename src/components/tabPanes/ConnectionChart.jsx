import React, { Component } from 'react';
import { random } from 'lodash'
import { VictoryChart, VictoryGroup,VictoryBar, VictoryArea, VictoryAxis } from 'victory'
import { Observable } from 'rx'


export class ConnectionChart extends Component {
    constructor(props) {
        super(props);
        this.state = { cpu: [] }
    }

    componentDidMount() {
        this._subscribe = Observable.interval(1000).subscribe(() => {
            let cpu = this.state.cpu;
            if (cpu.length === 10) {
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
            <VictoryChart domain={{ y: [0, 100] }} >
                <VictoryAxis
                    style={{
                        axis: { stroke: 'lightgray' },
                        axisLabel: { fontSize: 8, fill: 'gray' },
                        ticks: { stroke: '#ccc' },
                        tickLabels: { fontSize: 8, fill: 'gray', },
                        grid: { stroke: '#B3E5FC', strokeWidth: 0.25 }
                    }} dependentAxis
                />
                <VictoryAxis
                    style={{
                        axis: { stroke: 'lightgray' },
                        axisLabel: { fontSize: 10 },
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
                        labels={(d) => `${d.y}%`}
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
        );
    }
}
