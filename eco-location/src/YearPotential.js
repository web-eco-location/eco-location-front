import React from 'react';
import './css/YearPotential.css';
import testData from "./testData.json";
import PotentialGraph from './PotentialGraph';

class YearPotential extends React.Component { // 시간별 잠재량 페이지
    constructor(props) {
        super(props);
        this.state = {
            items: [],
            isEmpty: true,
            loading: true
        };
    }
    
    drawGraph = () => { // 말이 draw지 사실상 componentDidUpdate 그런데 datetime만 반응하는
        if(!this.state.startDate||!this.state.startTime||!this.state.endDate||!this.state.endTime) {
            this.setState({isEmpty: true});
            return;
        }

        // 사용자로부터 입력받은 날짜와 시간
        var start = this.state.startDate + " " + this.state.startTime + ":00";
        var end = this.state.endDate + " " + this.state.endTime + ":00";
        
        // start가 더 늦을경우
        if(new Date(start)>new Date(end)) {
            var tmp = start;
            start = end;
            end = tmp;
        }
        console.log(start+"&to="+end);
        
        // 실제 데이터 요청
        // call("/energy-potential?from="+start+"&to="+end, "GET", null).then((response) =>
        //     this.setState({items:this.dataCleaning(response.data)})
        // );
        
        // 예시 데이터
        this.setState({items:this.dataCleaning(testData), isEmpty: false, loading:false});
    }

    handleChange = (event) => {
        const { name, value } = event.target;
        this.setState({ [name]: value }, this.drawGraph);
    }

    dataCleaning = function(items) {
        // 실전 코드
        // 변수명이 어째서 korean인가 하면 표 그릴때 keys 이름 바꾸는 법을 모르겠습니다
        // var result = [
        //     { "areaName": "전라남도", "태양에너지":0, "풍력":0 },
        //     { "areaName": "경상북도", "태양에너지":0, "풍력":0 },
        //     { "areaName": "강원도", "태양에너지":0, "풍력":0 },
        //     { "areaName": "제주도", "태양에너지":0, "풍력":0 },
        //     { "areaName": "충청도", "태양에너지":0, "풍력":0 },
        //     { "areaName": "경상남도", "태양에너지":0, "풍력":0 },
        //     { "areaName": "전라북도", "태양에너지":0, "풍력":0 },
        //     { "areaName": "경기도", "태양에너지":0, "풍력":0 }

        // ];
        // items.forEach((item) => { 
        //     if(item.powerType==="1") {
        //         var area = result.find((a) => a.areaName===item.areaName);
        //         area.태양에너지 += item.forecastEnergyPotential;
        //     } else {
        //         var area = result.find((a) => a.areaName===item.areaName);
        //         area.풍력 += item.forecastEnergyPotential;
        //     }
        // });

        // 정리-미리한 예시 데이터 (3000건 정리 금방됨)
        var result = [
            {
                "areaName": "전라남도",
                "태양에너지": 46220.013141376,
                "풍력": 3186948.5441599987
            },
            {
                "areaName": "경상북도",
                "태양에너지": 17433.175799160996,
                "풍력": 25185501.634600006
            },
            {
                "areaName": "강원도",
                "태양에너지": 9630.720590723,
                "풍력": 3199929.0155000016
            },
            {
                "areaName": "제주도",
                "태양에너지": 10381.792448657998,
                "풍력": 11914936.443757989
            },
            {
                "areaName": "충청도",
                "태양에너지": 22967.303496292006,
                "풍력": 13956.789298790005
            },
            {
                "areaName": "경상남도",
                "태양에너지": 17141.334741592997,
                "풍력": 711362.407186
            },
            {
                "areaName": "전라북도",
                "태양에너지": 8662.480580408,
                "풍력": 437916.94291999994
            },
            {
                "areaName": "경기도",
                "태양에너지": 7743.232343817997,
                "풍력": 878363.6194350005
            }
        ];

        return result;
    }

    componentDidMount() {
        // 1. 처음 왔을때 표가 아예 없음
        // 2. 빈 표라도 있음 (축값 새로 줘야함)
        var testData = [
            { "areaName": "전라남도", "태양에너지":9500, "풍력":0 },
            { "areaName": "경상북도", "태양에너지":0, "풍력":0 },
            { "areaName": "강원도", "태양에너지":0, "풍력":0 },
            { "areaName": "제주도", "태양에너지":0, "풍력":0 },
            { "areaName": "충청도", "태양에너지":0, "풍력":0 },
            { "areaName": "경상남도", "태양에너지":0, "풍력":0 },
            { "areaName": "전라북도", "태양에너지":0, "풍력":0 },
            { "areaName": "경기도", "태양에너지":0, "풍력":0 }
        ];
        this.setState({items:testData});
    }
    
    render() {
        var graph = this.state.items.length>0&&(<PotentialGraph items={this.state.items} isEmpty={this.state.isEmpty}/>);
        
        // 데이트인풋 타임인풋 써도 되는걸까...
        return (
            <div className='container'>
                <div className='datetimeContainer'>
                    기간:
                    <input id="dateInput" name="startDate" type="date" onChange={this.handleChange} />
                    <input id="timeInput" name="startTime" type="time" onChange={this.handleChange} />
                    -
                    <input id="dateInput" name="endDate" type="date" onChange={this.handleChange} />
                    <input id="timeInput" name="endTime" type="time" onChange={this.handleChange} />
                </div>
                {graph}
            </div>
        );
    }  
}

export default YearPotential;