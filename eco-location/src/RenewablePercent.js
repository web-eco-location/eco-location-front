import React from 'react';
import './css/TotalPotential.css';
import Map from './PercentMap';
import {call} from './service/ApiService';

class Renewable_percent extends React.Component { // 지역별 잠재량 페이지
    constructor(props) {  
        super(props);
        this.state = {
            bgData: {},
            items: [],
            loading: true,
        };
    }

    calcBackgroundColor = (items) => {
        var maxValue, minValue, d;
        maxValue = items.reduce((max, p) => p.potentialAmount > max ? p.potentialAmount : max, items[0].potentialAmount); 
        minValue = items.reduce((min, p) => p.potentialAmount < min ? p.potentialAmount : min, items[0].potentialAmount); 
        d = (maxValue-minValue+1)/10;

        var newbgData = {"min": minValue, "d": d};
        if(JSON.stringify(this.state.bgData)!=JSON.stringify(newbgData)) {
            this.setState({bgData: newbgData}, () => {this.drawLegend()});
        } 
    }

    drawLegend = () => {
        var legendContainer = document.querySelector(".legendContainer");
        legendContainer.innerHTML = "";
        for(var i=0; i<10; i++) {
            var tmp = (15-i).toString(16);
            var backgroundColor = "#22"+tmp+"F"+tmp+"F";
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
        unit.innerHTML = "* 단위: %"
        legendContainer.appendChild(unit);
    };

    sideInfo = () => {
        // 수정) 지도따라 전체데이터 + 설명 띄우기
        var title = document.querySelector(".title");
        var info = document.querySelector(".info");

        const year = new Date().getFullYear() -1;
        title.innerHTML = "국내 재생에너지 생산 비율";
        info.innerHTML = "설명이 들어가는 곳"+
                        "<div class='small'>* "+year+"년 자료</div>";
    }
    
    componentDidMount() {
        // 실제 사용
        const year = new Date().getFullYear() -1;
        call("/areageneratorsource?start="+year+"-01-01&end="+year+"-12-31", "GET", null).then((response) =>
            this.setState({items:response, loading:false}, () => {
                this.calcBackgroundColor(response); 
                this.sideInfo();
            })
        );
    }
    
    render() {
        var map;
        if(this.state.totalData&&this.state.by=="total") {
            map = this.state.totalData.length>0&&(<Map by={this.state.by} items={this.state.items} bgData={this.state.bgData} />);
        } else {
            map = <div className='mapContainer'></div>
        }

        var renewablePercentPage = (
            <div className='pageContainer'>
                {map}
                <div className='sideController'>
                    <div className='legendContainer'></div>
                </div>
                <div className='side'>
                    <div className='title'></div>
                    <div className='info'></div>
                </div>
            </div>
        );

        var loadingPage = <h1>...</h1>
        var content = loadingPage;

        if(!this.state.loading) {
            console.log("loading end");
            content = renewablePercentPage;
        }

        return(
            <div className='container'>
                {content}
            </div>
        );
    }
}

export default Renewable_percent;