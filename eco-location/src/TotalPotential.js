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
        // 일단 둘다 풀면 둘다 체크되도록 했음... 다 풀리면 지도만 띄우는게 맞나? 
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
    
    componentDidMount() {
        // 실제 사용
        const year = new Date().getFullYear() -1;
        call("/energy-potential/source?year="+year, "GET", null).then((response) =>
            this.setState({by:"total", totalData:response, loading:false}, this.calcBackgroundColor(response))
        );
            
        call("/energy-potential/source-type?year="+year, "GET", null).then((response) =>
            this.setState({sourceData:response})
        );
    }
    
    render() {
        var map;
        if(this.state.totalData&&this.state.by=="total") {
            map = this.state.totalData.length>0&&(<Map by={this.state.by} items={this.state.totalData} bgData={this.state.bgData} sideInfo={this.sideInfo} />);
        } else if (this.state.sourceData) {
            map = this.state.sourceData.length>0&&(<Map by={this.state.by} items={this.state.sourceData} bgData={this.state.bgData} sideInfo={this.sideInfo} />);
        } else {
            map = <div className='mapContainer'></div>
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
            <div className='side'></div>
        </div>
        );

        var loadingPage = <h1>...</h1>
        var content = loadingPage;

        if(!this.state.loading) {
            console.log("loading end");
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