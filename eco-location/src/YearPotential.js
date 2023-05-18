import React from 'react';
import './css/TotalPotential.css';
import KakaoMap from './PotentialMap';

class YearPotential extends React.Component { // 지역별 잠재량 페이지
  constructor(props) {  
    super(props);
    this.state = {
      by: "year",
      items: [],
      loading: true,
    };
  }
  
  componentDidMount() {
    // call("/potential/total", "GET", null).then((response) =>
    //   this.setState({items:response.data, loading:false}, this.legend)
    // );

    // 테스트용 데이터
    var testData = [
      {	"area": "gangwonDo","data": 494470.7381649313 },
      { "area": "jejuIsland", "data": 423423.2322175159 },
      { "area": "gyeonggiDo", "data": 368545.6747648805 },
      { "area": "jeollabukDo", "data": 409799.93973072513 },
      { "area": "jeollanamDo", "data": 2000243.1579725298 },
      { "area": "chungcheongDo", "data": 1087404.0848657144 },
      { "area": "gyeongsangbukDo", "data": 747818.4639277749 },
      { "area": "gyeongsangnamDo", "data": 715344.7420174808 }
      
    ];
    // this.setState({items:testData, loading:false}, this.legend);
  }
  
  render() {
    // var map = this.state.items.length>0 && (
    //   <KakaoMap by={this.state.by} items={this.state.items}/>
    // );

    // var totalPotentialPage = (
    //   <div className='pageContainer'>
    //     {map}
    //     <div className='totalLegend'></div>
    //   </div>
    // );

    // var loadingPage = <h1>...</h1>
    // var content = loadingPage;

    // if(!this.state.loading) {
    //   console.log("loading end");
    //   content = totalPotentialPage;
    // }

    return(
      <div className='container'>
        {/* {content} */}
      </div>
    );
  }
}

export default YearPotential;