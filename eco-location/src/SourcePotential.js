import React from 'react';
import './css/SourcePotential.css';
import KakaoMap from './Map';

class SourcePotential extends React.Component { // 지역별 잠재량 페이지
  constructor(props) {  
    super(props);
    this.state = {
      by: "source1", // 우와 코드 꼬라지
      items: [],
      loading: true,
    };
  }

  legend = () => {  // 으악 코드 눈썩는다
    var legendContainer = document.querySelector(".sourceLegend");
    legendContainer.innerHTML = "";
  
    var maxValue, minValue, d, bg0, bg1;
    if(this.state.by=="source1") {
      maxValue = this.state.items.reduce((max, p) => p.potentialOfSolar > max ? p.potentialOfSolar : max, this.state.items[0].potentialOfSolar); 
      minValue = this.state.items.reduce((min, p) => p.potentialOfSolar < min ? p.potentialOfSolar : min, this.state.items[0].potentialOfSolar); 
      d = (maxValue-minValue+1)/10;
      bg0 = "#";
      bg1 = "F0000";
    } else if(this.state.by=="source2") {
      maxValue = this.state.items.reduce((max, p) => p.potentialOfWind > max ? p.potentialOfWind : max, this.state.items[0].potentialOfWind); 
      minValue = this.state.items.reduce((min, p) => p.potentialOfWind < min ? p.potentialOfWind : min, this.state.items[0].potentialOfWind); 
      d = (maxValue-minValue+1)/10;
      bg0 = "#0000";
      bg1 = "F";
    }

    for(var i=0; i<10; i++) {
      var backgroundColor = bg0+(15-i).toString(16)+bg1;
      var range = document.createElement("div");
      range.className = "range";
      range.innerHTML = "<div class='color' style='background-color:"+backgroundColor+"'></div>"+
                        "<div class='lbl'>"+ 
                          Math.round((minValue+i*d)*100)/100 + " - " + Math.round((minValue+(i+1)*d-1)*100)/100 +
                        "</div>";
      legendContainer.appendChild(range);
    }
  };

  changeHandler = (e) => {
    this.setState({by:"source"+e.target.value});
  }

  componentDidUpdate() {
    // 다시 범례 그리기
    this.legend();
  }
  
  componentDidMount() {
    // call("/potential/source", "GET", null).then((response) =>
    //   this.setState({items:response.data, loading:false}, this.legend)
    // );

    // 테스트용 데이터
    var testData = [
      {area:"gangwonDo", potentialOfSolar: 924.9715164540003, potentialOfWind: 38003.022187},
      {area:"gyeonggiDo", potentialOfSolar:1000, potentialOfWind:18000},
      {area:"gyeongsangnamDo", potentialOfSolar:2000, potentialOfWind:40000},
      {area:"gyeongsangbukDo", potentialOfSolar:2000, potentialOfWind:35000},
      {area:"jeollanamDo", potentialOfSolar:1800, potentialOfWind:34000},
      {area:"jeollabukDo", potentialOfSolar:1600, potentialOfWind:30000},
      {area:"jejuIsland", potentialOfSolar:2200, potentialOfWind:50000},
      {area:"chungcheongDo", potentialOfSolar:1000, potentialOfWind:20000},
    ];
    this.setState({items:testData, loading:false}, this.legend);
  }
  
  render() {
    var map = this.state.items.length>0 && (
      <KakaoMap by={this.state.by} items={this.state.items}/>
    );

    var sourcePotentialPage = (
      <div className='pageContainer'>
        {map}
        <div className='side'>
          <div className='sourceLegend'></div>
          <div className='buttonContainer'>
            <label style={{color:"red"}}>
              <input type="radio" onChange={this.changeHandler} name="type" value="1" defaultChecked />태양에너지
            </label>
            <label style={{color:"blue"}}>
              <input type="radio" onChange={this.changeHandler} name="type" value="2" />풍력
            </label>
          </div>
        </div>
      </div>
    );

    var loadingPage = <h1>...</h1>
    var content = loadingPage;

    if(!this.state.loading) {
      console.log("loading end");
      content = sourcePotentialPage;
    }

    return(
      <div className='container'>
        {content}
      </div>
    );
  }
}

export default SourcePotential;

// 문제 1) 지도 경계선 새로 그려야할듯 광역시 날리고
// 문제 2) 백에서 넘어오는 json 데이터 수정 필요