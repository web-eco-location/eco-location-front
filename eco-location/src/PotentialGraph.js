import React from "react";
import "./css/PotentialGraph.css";
import { ResponsiveBar } from '@nivo/bar'

const customColors = {  // 투명색 넣는 용도
    '태양에너지': 'rgba(255, 0, 0, 0)',
    '풍력': 'rgba(0, 0, 255, 0)',
};
const EmptyBar = ({ data }) => (
    <ResponsiveBar
        data={data}
        keys={[ // 표에 나타낼 값
            '태양에너지',
            '풍력'
        ]}
        indexBy="areaName"  // 가로축
        groupMode="stacked"
        margin={{ top: 20, right: 30, bottom: 80, left: 100 }}
        padding={0.3}
        valueScale={{ type: 'linear' }}
        colors={({ id }) => customColors[id]}
        axisTop={null}
        axisRight={null}
        axisBottom={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0
        }}
        axisLeft={{ 
            // tickValues: Array.from(Array(11).keys()).map((index) => index * 500),
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: '잠재량 총합(W)',
            legendPosition: 'middle',
            legendOffset: -70
        }}
        labelSkipWidth={10000}
        labelSkipHeight={10000}
        tooltip={(node) => {
            return null;
        }}
        borderColor="#000000"
        legends={[
            {
                dataFrom: 'keys',
                anchor: 'bottom',
                direction: 'row',
                justify: false,
                translateX: 30,
                translateY: 60,
                itemsSpacing: 2,
                itemWidth: 160,
                itemHeight: 20,
                itemDirection: 'left-to-right',
                itemOpacity: 0.85,
                symbolSize: 20,
                effects: [
                    {
                        on: 'hover',
                        style: {
                            itemOpacity: 1
                        }
                    }
                ]
            }
        ]}
        role="application"
        ariaLabel="Nivo bar chart demo"
        barAriaLabel={function(e){return e.id+": "+e.formattedValue+" in country: "+e.indexValue}}
    />
);

const MyResponsiveBar = ({ data }) => (
    <ResponsiveBar
        data={data}
        keys={[ // 표에 나타낼 값
            '태양에너지',
            '풍력'
        ]}
        indexBy="areaName"  // 가로축
        groupMode="stacked"
        margin={{ top: 20, right: 30, bottom: 80, left: 100 }}
        padding={0.3}
        // valueScale={{ type: 'linear' }}  // 리니어 테스트시 axisLeft tickValues 주석처리
        valueScale={{ type: 'symlog' }}
        indexScale={{ type: 'band', round: true }}
        colors={{ scheme: 'pastel1' }}
        borderColor={{
            from: 'color',
            modifiers: [
                [
                    'darker',
                    1.6
                ]
            ]
        }}
        axisTop={null}
        axisRight={null}
        axisBottom={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0
        }}
        axisLeft={{ // 좌측 축
            tickValues: Array.from(Array(7).keys()).map((index) => {
                if(index<2) {
                    return index*3000+4000;
                } else {
                    return Math.pow(10, index+1);
                }
            }),
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: '잠재량 총합(W)',
            legendPosition: 'middle',
            legendOffset: -70
        }}
        tooltip={({ color, data }) => // 마우스 올리면 뜨는 창
            <div style={{ padding: 12, color, background: '#222222' }}>
                <strong>
                    {data.areaName}<br />
                    태양에너지: {data.태양에너지}W<br />
                    풍력: {data.풍력}W
                </strong>
            </div>
        }
        label={d => `${Math.floor((d.value)*100)/100}`}
        labelSkipWidth={1}
        labelSkipHeight={1}
        labelTextColor={{
            from: 'color',
            modifiers: [
                [
                    'darker',
                    3
                ]
            ]
        }}
        legends={[  // 범례
            {
                dataFrom: 'keys',
                anchor: 'bottom',
                direction: 'row',
                justify: false,
                translateX: 30,
                translateY: 60,
                itemsSpacing: 2,
                itemWidth: 160,
                itemHeight: 20,
                itemDirection: 'left-to-right',
                itemOpacity: 0.85,
                symbolSize: 20,
                effects: [
                    {
                        on: 'hover',
                        style: {
                            itemOpacity: 1
                        }
                    }
                ]
            }
        ]}
        role="application"
        ariaLabel="Nivo bar chart demo"
        barAriaLabel={function(e){return e.id+": "+e.formattedValue+" in country: "+e.indexValue}}
    />
);

class PotentialGraph extends React.Component {
    render() {
        let bar;
        if(this.props.isEmpty) {
            bar = <EmptyBar data={this.props.items} />
            // bar = <MyResponsiveBar data={this.props.items} />
        } else {
            bar = <MyResponsiveBar data={this.props.items} />
        }

        return(
            <div className="graphContainer">
                {bar}
            </div>
        );
    }
}
export default PotentialGraph;

// 문제점) 보조축 기능이 없는데 구현도 곤란하여 축 구간을 겹쳐 보기 힘듦
// > 지금 해둔것처럼 수동으로 조절하거나 다른 라이브러리 사용을 고려