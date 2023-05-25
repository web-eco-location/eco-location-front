import React from 'react';
import './css/YearPotential.css';
import PotentialGraph from './PotentialGraph';
import { call } from './service/ApiService';

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
        
        // 로딩 표시
        var emptyInfo = document.querySelector(".emptyInfo");
        emptyInfo.innerHTML = "로딩중...";
        emptyInfo.style.display="block";

        // 실제 데이터 요청
        call("/energy-potential?from="+start+"&to="+end, "GET", null).then((response) =>
            this.setState(this.dataCleaning(response), () => {
                emptyInfo.innerHTML = "조회된 데이터가 없습니다.";
                if(!this.state.isEmpty) emptyInfo.style.display="none";
                console.log(this.state);
            })
        );
    }

    handleChange = (event) => {
        const { name, value } = event.target;
        this.setState({ [name]: value }, this.drawGraph);
    }

    dataCleaning = function(items) {
        // 실전 코드
        // 변수명이 어째서 korean인가 하면 표 그릴때 keys 이름 바꾸는 법을 모르겠습니다
        var result = [
            { "areaName": "전라남도", "태양에너지":0, "풍력에너지":0 },
            { "areaName": "경상북도", "태양에너지":0, "풍력에너지":0 },
            { "areaName": "강원도", "태양에너지":0, "풍력에너지":0 },
            { "areaName": "제주도", "태양에너지":0, "풍력에너지":0 },
            { "areaName": "충청남도", "태양에너지":0, "풍력에너지":0 },
            { "areaName": "충청북도", "태양에너지":0, "풍력에너지":0 },
            { "areaName": "경상남도", "태양에너지":0, "풍력에너지":0 },
            { "areaName": "전라북도", "태양에너지":0, "풍력에너지":0 },
            { "areaName": "경기도", "태양에너지":0, "풍력에너지":0 }

        ];
        if(!items) {
            return {items:result, isEmpty:true};
        }

        items.forEach((item) => { 
            if(item.powerType==='1') {
                var area = result.find((a) => a.areaName===item.areaName);
                if(area) {
                    area.태양에너지 += item.forecastEnergyPotential;
                }
            } else {
                var area = result.find((a) => a.areaName===item.areaName);
                if(area) {
                    area.풍력에너지 += item.forecastEnergyPotential;
                }
            }
        });
        return {items:result, isEmpty:false};
    }

    componentDidMount() {
        const today = new Date();
        const year = today.getFullYear();
        const month = String(today.getMonth() + 1).padStart(2, '0');
        const day = String(today.getDate()).padStart(2, '0');
        const formattedDate = `${year}-${month}-${day}`;

        var emptyData = [
            { "areaName": "전라남도", "태양에너지":9500, "풍력에너지":0 },
            { "areaName": "경상북도", "태양에너지":0, "풍력에너지":0 },
            { "areaName": "강원도", "태양에너지":0, "풍력에너지":0 },
            { "areaName": "제주도", "태양에너지":0, "풍력에너지":0 },
            { "areaName": "충청남도", "태양에너지":0, "풍력에너지":0 },
            { "areaName": "충청북도", "태양에너지":0, "풍력에너지":0 },
            { "areaName": "경상남도", "태양에너지":0, "풍력에너지":0 },
            { "areaName": "전라북도", "태양에너지":0, "풍력에너지":0 },
            { "areaName": "경기도", "태양에너지":0, "풍력에너지":0 }
        ];
        this.setState({items:emptyData, today:formattedDate, loading:false});
    }
    
    render() {
        var graph = this.state.items.length>0&&(<PotentialGraph items={this.state.items} isEmpty={this.state.isEmpty}/>);
        
        var yearPotentialPage = (
            <div className='graphPageContainer'>
                <div className='datetimeContainer'>
                    기간:
                    <div className='inputWrap'>
                        <input id="dateInput" name="startDate" type="date" min="2020-01-01" max={this.state.today} onChange={this.handleChange} />
                        <input id="timeInput" name="startTime" type="time" onChange={this.handleChange} />
                    </div>
                    ㅡ
                    <div className='inputWrap'>
                        <input id="dateInput" name="endDate" type="date" min="2020-01-01" max={this.state.today} onChange={this.handleChange} />
                        <input id="timeInput" name="endTime" type="time" onChange={this.handleChange} />
                    </div>
                </div>
                {graph}
                <h2 className="emptyInfo">조회된 데이터가 없습니다.</h2>
            </div>
        );

        var loadingPage = <h1>...</h1>
        var content = loadingPage;

        if(!this.state.loading) {
            console.log("loading end");
            content = yearPotentialPage;
        }

        return (
            <div className='container'>
                {content}
            </div>
        );
    }  
}

export default YearPotential;