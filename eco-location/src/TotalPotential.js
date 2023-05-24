import React from 'react';
import './css/TotalPotential.css';
import Map from './PotentialMap';
import {call} from './service/ApiService';

class TotalPotential extends React.Component { // 지역별 잠재량 페이지
    constructor(props) {  
        super(props);
        this.state = {
            by: "",
            bgData: {},
            totalData: [],
            sourceData: [],
            loading: true,
        };
    }

    calcBackgroundColor = (items) => {
        var maxValue, minValue, d, bg0, bg1;
        if(this.state.by=="total") {
            maxValue = items.reduce((max, p) => p.potentialAmount > max ? p.potentialAmount : max, items[0].potentialAmount); 
            minValue = items.reduce((min, p) => p.potentialAmount < min ? p.potentialAmount : min, items[0].potentialAmount); 
            d = (maxValue-minValue+1)/10;
            bg0 = "#00";
            bg1 = "F00";
        } else if(this.state.by=="source1") {
            maxValue = items.reduce((max, p) => p.solarEnergyPotential > max ? p.solarEnergyPotential : max, items[0].solarEnergyPotential); 
            minValue = items.reduce((min, p) => p.solarEnergyPotential < min ? p.solarEnergyPotential : min, items[0].solarEnergyPotential); 
            d = (maxValue-minValue+1)/10;
            bg0 = "#";
            bg1 = "F0000";
        } else if(this.state.by=="source2") {
            maxValue = items.reduce((max, p) => p.windEnergyPotential > max ? p.windEnergyPotential : max, items[0].windEnergyPotential); 
            minValue = items.reduce((min, p) => p.windEnergyPotential < min ? p.windEnergyPotential : min, items[0].windEnergyPotential); 
            d = (maxValue-minValue+1)/10;
            bg0 = "#0000";
            bg1 = "F";
        }

        var newbgData = {"min": minValue, "d": d, "bg0": bg0, "bg1": bg1};
        if(JSON.stringify(this.state.bgData)!=JSON.stringify(newbgData)) {
            this.setState({bgData: newbgData}, () => {this.drawLegend()});
        } 
    }

    drawLegend = () => {
        var legendContainer = document.querySelector(".legendContainer");
        legendContainer.innerHTML = "";
        for(var i=0; i<10; i++) {
            var backgroundColor = this.state.bgData.bg0+(15-i).toString(16)+this.state.bgData.bg1;
            var range = document.createElement("div");
            range.className = "range";
            range.innerHTML = "<div class='color' style='background-color:"+backgroundColor+"'></div>"+
                                "<div class='lbl'>"+ 
                                Math.round((this.state.bgData.min+i*this.state.bgData.d)*100)/100+" - "+ 
                                Math.round((this.state.bgData.min+(i+1)*this.state.bgData.d-1)*100)/100 +
                                "</div>";
            legendContainer.appendChild(range);
        }
        
        var unit = document.createElement("div");
        unit.className = "small";
        unit.innerHTML = "단위: W"
        legendContainer.appendChild(unit);

        this.sideInfo();
    };
    
    checkHandler = (e) => {
        // 일단 둘다 풀면 둘다 체크되도록 했음... 다 풀리면 지도만 띄워야하나? 
        var checkboxs = document.getElementsByClassName("checkbox");
        if(checkboxs[0].checked && checkboxs[1].checked) {  // 둘다 체크
            this.setState({by:"total"}, () => {this.calcBackgroundColor(this.state.totalData)});
        } else if(checkboxs[0].checked && !checkboxs[1].checked) {
            this.setState({by:"source1"}, () => {this.calcBackgroundColor(this.state.sourceData)});
        } else if(!checkboxs[0].checked && checkboxs[1].checked) {
            this.setState({by:"source2"}, () => {this.calcBackgroundColor(this.state.sourceData)});
        } else if(!checkboxs[0].checked && !checkboxs[1].checked) { // 둘다 미체크
            checkboxs[0].checked = true;
            checkboxs[1].checked = true;
            this.setState({by:"total"}, () => {this.calcBackgroundColor(this.state.totalData)});
        }
    }

    sideInfo = (areaName) => {
        // 클릭당한 지역의 정보를 사이드 영역에 띄움
        // 내용 고민중 - 1.현재 지도따라 2.전체랑 발전원별 전부
        var side = document.querySelector(".side");
        if(!areaName) {
            side.innerHTML = "";
            return;
        }

        const year = new Date().getFullYear() -1;
        if(this.state.by==="total") {
            var data = this.state.totalData.find((d) => d.areaName===areaName);
            side.innerHTML = "<div class='title'>"+data.areaName+" 잠재량 총합</div>"+
                            "<div class='info'>"+data.potentialAmount+"W</div>"+
                            "<div class='small'>*"+year+"년 자료</div>";
        } else if(this.state.by==="source1") {
            var data = this.state.sourceData.find((d) => d.areaName===areaName);
            side.innerHTML = "<div class='title'>"+data.areaName+" 태양에너지 잠재량 총합</div>"+
                            "<div class='info'>"+data.solarEnergyPotential+"W</div>"+
                            "<div class='year'>*"+year+"년 자료</div>";
        } else if(this.state.by==="source2") {
            var data = this.state.sourceData.find((d) => d.areaName===areaName);
            side.innerHTML = "<div class='title'>"+data.areaName+" 풍력에너지 잠재량 총합</div>"+
                            "<div class='info'>"+data.windEnergyPotential+"W</div>"+
                            "<div class='year'>*"+year+"년 자료</div>";
        }
        
    }

    // componentDidUpdate() {
    //     // 다시 그리기
    //     this.calcBackgroundColor(this.state.items);
    // }

    componentDidMount() {
        // 실제 사용
        // const year = new Date().getFullYear() -1;
        // call("/energy-potential/source?year="+year, "GET", null).then((response) =>
        //   this.setState({by:"total", totalData:response.data, loading:false}, this.calcBackgroundColor(response))
        // );

        // call("/energy-potential/source-type?year="+year, "GET", null).then((response) =>
        //   this.setState({sourceData:response.data})
        // );


        // 테스트용
        var testData = [
            // 지역별 잠재량(연도필수) http://localhost:8080/energy-potential/source?year=2020
            { "areaName": "전라남도", "potentialAmount": 77523.66086630497 },
            { "areaName": "강원도", "potentialAmount": 208292.44161532796 },
            { "areaName": "경상북도", "potentialAmount": 2955324.3803320806 },
            { "areaName": "제주도", "potentialAmount": 858248.8828292049 },
            { "areaName": "충청도", "potentialAmount": 2982.835942651999 },
            { "areaName": "경기도", "potentialAmount": 38927.993703454 },
            { "areaName": "전라북도", "potentialAmount": 1685.0603750950004 },
            { "areaName": "경상남도", "potentialAmount": 3244.695406506 }

            // 기간 지정 잠재량(이건 어디다 씀? 아마 시간별 통계?) http://localhost:8080/energy-potential?from=2020-10-01 12:00:00&to=2020-10-09 12:00:00
            // {
            //   "id": 105215,
            //   "powerType": "1",
            //   "areaName": "강원도",
            //   "createTime": "2020-10-01T09:00:00",
            //   "forecastTime": "2020-10-01T12:00:00",
            //   "leadTime": 3,
            //   "forecastEnergyPotential": 94.81432319,
            //   "forecastCapacity": 444.585005
            // }
        ];
        this.setState({by:"total", totalData:testData, loading:false}, () => {this.calcBackgroundColor(testData)});
        
        var testData2 = [
            // 발전원별 잠재량 http://localhost:8080/energy-potential/source-type?year=2020
            { "areaName": "전라남도", "solarEnergyPotential": 9053.617026305, "windEnergyPotential": 68470.04384 },
            { "areaName": "경상북도", "solarEnergyPotential": 3142.4848320809997, "windEnergyPotential": 2952181.8954999996 },
            { "areaName": "강원도", "solarEnergyPotential": 2056.539695328, "windEnergyPotential": 206235.90191999997 },
            { "areaName": "제주도", "solarEnergyPotential": 1331.7380792049998, "windEnergyPotential": 856917.14475 },
            { "areaName": "충청도", "solarEnergyPotential": 2982.835942651999, "windEnergyPotential": 0 },
            { "areaName": "경상남도", "solarEnergyPotential": 3244.695406506, "windEnergyPotential": 0 },
            { "areaName": "전라북도", "solarEnergyPotential": 1685.0603750950004, "windEnergyPotential": 0 },
            { "areaName": "경기도", "solarEnergyPotential": 924.9715164540003, "windEnergyPotential": 38003.022187 }
        ];
        this.setState({sourceData:testData2});
    }
    
    render() {
        var map;
        if(this.state.by=="total") {
            map = this.state.totalData.length>0&&(<Map by={this.state.by} items={this.state.totalData} bgData={this.state.bgData} sideInfo={this.sideInfo} />);
        } else {
            map = this.state.sourceData.length>0&&(<Map by={this.state.by} items={this.state.sourceData} bgData={this.state.bgData} sideInfo={this.sideInfo} />);
        }

        var totalPotentialPage = (
        <div className='pageContainer'>
            {map}
            <div className='sideController'>
                <div className='legendContainer'></div>
                <div className='checkboxContainer'>
                    <label style={{color:"red"}}>
                        <input className='checkbox' type="checkbox" onChange={this.checkHandler} defaultChecked="true" />태양에너지
                    </label>
                    <label style={{color:"blue"}}>
                        <input className='checkbox' type="checkbox" onChange={this.checkHandler} defaultChecked="true" />풍력
                    </label>
                </div>
            </div>
            <div className='side'> 
                {/* 무슨 노트로 쓰고있음 */}
                변경 - 맵 줌 기능 꺼둠, 잠재량 전용 맵 컴포넌트 분리, 지역/발전원 합침, 데이터 저장 방식 변경, 클릭한 데이터 사이드에 띄우기
                <br/>
                진행 - 필요없는 지도 이벤트 정리
                ㄴ지역명 커스텀오버레이 제거?
                <br/>
                목표 - 디자인...
                <br/>
                문의 - 지난달의 발전량을 가져와야하는데 이건 년단위 데이터아닌지 확인 20년 1월 ~ 22년 12월 27일 17시까지
            </div>
        </div>
        );

        var loadingPage = <h1>...</h1>
        var content = loadingPage;

        if(!this.state.loading) {
            // console.log("loading end");
            content = totalPotentialPage;
        }

        return(
            <div className='container'>
                {content}
            </div>
        );
    }
}

export default TotalPotential;