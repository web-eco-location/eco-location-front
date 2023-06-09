import React from "react";
import "./css/PotentialGraph.css";
import { ResponsiveBar } from '@nivo/bar'

const customColors = {  // 투명색 넣는 용도
    '태양에너지': 'rgba(255, 0, 0, 0)',
    '풍력': 'rgba(0, 0, 255, 0)',
};
const EmptyBar = ({ data }) => (    // 데이터 비었을때 띄우는 용도
    <ResponsiveBar
        data={data}
        keys={[ // 표에 나타낼 값
            '태양에너지',
            '풍력에너지'
        ]}
        indexBy="areaName"  // 가로축
        groupMode="stacked"
        margin={{ top: 30, right: 50, bottom: 80, left: 100 }}
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
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: '잠재량 총합(kW)',
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
            '풍력에너지'
        ]}
        indexBy="areaName"  // 가로축
        groupMode="stacked"
        margin={{ top: 30, right: 50, bottom: 80, left: 100 }}
        padding={0.3}
        valueScale={{ type: 'linear' }}
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
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: '잠재량 총 합(kW)',
            legendPosition: 'middle',
            legendOffset: -70
        }}
        tooltip={({ data }) => // 마우스 올리면 뜨는 창
            <div style={{ padding: 12, background: '#222222' }}>
                <strong>
                    <div style={{ color:"white" }}>
                        {data.areaName}
                    </div>
                    <div style={{ color:"#fbb4ae" }}>
                        태양에너지: {data.태양에너지?data.태양에너지:"0"}kW
                    </div>
                    <div style={{ color:"#b3cde3" }}>
                        풍력에너지: {data.풍력에너지?data.풍력에너지:"0"}kW
                    </div>
                </strong>
            </div>
        }
        labelSkipWidth={10}
        labelSkipHeight={10}
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
    transformData = (data) => { // 단위 변경
        return data.map((item) => ({
            areaName: item.areaName,
            태양에너지: Math.floor((item.태양에너지)/10)/100,
            풍력에너지: Math.floor((item.풍력에너지)/10)/100
        }));  
    };
    
    render() {
        let bar;
        if(this.props.isEmpty) {
            bar = <EmptyBar data={this.props.items} />
        } else {
            bar = <MyResponsiveBar data={this.transformData(this.props.items)} />
        }

        return(
            <div className="graphContainer">
                {bar}
            </div>
        );
    }
}
export default PotentialGraph;