import React from 'react';
import './css/TotalPotential.css';
import KakaoMap from './Map';

class TotalPotential extends React.Component { // 지역별 잠재량 페이지
  constructor(props) {  
    super(props);
    this.state = {
      by: "total",
      items: [],
      loading: true,
    };
  }

  legend = () => {
    var legendContainer = document.querySelector(".totalLegend");
    legendContainer.innerHTML = "";

    var maxValue = this.state.items.reduce((max, p) => p.data > max ? p.data : max, this.state.items[0].data); 
    var minValue = this.state.items.reduce((min, p) => p.data < min ? p.data : min, this.state.items[0].data); 
    var d = (maxValue-minValue+1)/10;

    for(var i=0; i<10; i++) {
      var backgroundColor = "#00"+(15-i).toString(16)+"F00";
      var range = document.createElement("div");
      range.className = "range";
      range.innerHTML = "<div class='color' style='background-color:"+backgroundColor+"'></div>"+
                        "<div class='lbl'>"+ 
                          Math.round((minValue+i*d)*100)/100 + " - " + Math.round((minValue+(i+1)*d-1)*100)/100 +
                        "</div>";
      legendContainer.appendChild(range);
    }
  };
  
  componentDidMount() {
    // call("/potential/total", "GET", null).then((response) =>
    //   this.setState({items:response.data, loading:false}, this.legend)
    // );

    // 테스트용 데이터
    // 디스 데이터 이즈 잠재량
    var testData = [
      {	"area": "gangwonDo","data": 494470.7381649313 },
      { "area": "jejuIsland", "data": 423423.2322175159 },
      { "area": "gyeonggiDo", "data": 368545.6747648805 },
      { "area": "jeollabukDo", "data": 409799.93973072513 },
      { "area": "jeollanamDo", "data": 2000243.1579725298 },
      { "area": "chungcheongDo", "data": 1087404.0848657144 },
      { "area": "gyeongsangbukDo", "data": 747818.4639277749 },
      { "area": "gyeongsangnamDo", "data": 715344.7420174808 }
      
      // { "area":"광주광역시", content:1000},
      // { "area":"대구광역시", content:1000},
      // { "area":"대전광역시", content:1000},
      // { "area":"부산광역시", content:1000},
      // { "area":"서울특별시", content:100},
      // { "area":"세종특별자치시", content:2000},
      // { "area":"울산광역시", content:1000},
      // { "area":"인천광역시", content:1000},
      // { "area": "gyeongsangnamDo", "data": 715344.7420174808 }
      // { "area": "gyeongsangnamDo", "data": 715344.7420174808 }
      // { "area": "gyeongsangnamDo", "data": 715344.7420174808 }
      // { "area": "gyeongsangnamDo", "data": 715344.7420174808 }
      // { "area": "gyeongsangnamDo", "data": 715344.7420174808 }
    ];
    this.setState({items:testData, loading:false}, this.legend);
  }
  
  render() {
    var map = this.state.items.length>0 && (
      <KakaoMap by={this.state.by} items={this.state.items}/>
    );

    var totalPotentialPage = (
      <div className='pageContainer'>
        {map}
        <div className='totalLegend'></div>
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