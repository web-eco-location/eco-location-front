import React from "react";
import { 
  Generator_DetailArea, 
  Generator_DetailArea_Count, 
  Generator_powerSource, 
  Potential_All, 
  Potential_Year_Sum, 
  Potential_Year, 
  Potential_Period,
  AreaGeneratorSource_Area,
  AreaGeneratorSource_Date,
  AreaGeneratorSource_Period,
  AreaGeneratorSource_Area_Period } 
  from "./service/ApiService";

class API_Test_Page extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      area: "",
      source: "",
      areacount: "",
      potential_year_sum: "",
      potential_year: "",
      potential_start: "",
      potential_end: "",
      source_area:"",
      source_date:"",
      source_startdate:"",
      source_enddate:"",
      responseJson: null,
      error: null
    };
  }

  handle_GenArea_Search = () => {
    const { area } = this.state;
    Generator_DetailArea(area)
      .then((response) => {
        this.setState({
          responseJson: response,
          error: null
        });
      })
      .catch((error) => {
        console.log(error);
        this.setState({
          responseJson: null,
          error: error
        });
      });
  };

  handle_GenSource_Search = () => {
    const { source } = this.state;
    Generator_powerSource(source)
      .then((response) => {
        this.setState({
          responseJson: response,
          error: null
        });
      })
      .catch((error) => {
        console.log(error);
        this.setState({
          responseJson: null,
          error: error
        });
      });
  };

  handle_GenArea_Count_Search = () => {
    const { areacount } = this.state;
    Generator_DetailArea_Count(areacount)
      .then((response) => {
        this.setState({
          responseJson: response,
          error: null
        });
      })
      .catch((error) => {
        console.log(error);
        this.setState({
          responseJson: null,
          error: error
        });
      });
  };

  handle_Potential_All_Search = () => {
    Potential_All()
      .then((response) => {
        this.setState({
          responseJson: response,
          error: null
        });
      })
      .catch((error) => {
        console.log(error);
        this.setState({
          responseJson: null,
          error: error
        });
      });
  };

  handle_Potential_Year_Sum_Search = () => {
    const { potential_year_sum } = this.state;
    Potential_Year_Sum(potential_year_sum)
      .then((response) => {
        this.setState({
          responseJson: response,
          error: null
        });
      })
      .catch((error) => {
        console.log(error);
        this.setState({
          responseJson: null,
          error: error
        });
      });
  };

  handle_Potential_Year_Search = () => {
    const { potential_year } = this.state;
    Potential_Year(potential_year)
      .then((response) => {
        this.setState({
          responseJson: response,
          error: null
        });
      })
      .catch((error) => {
        console.log(error);
        this.setState({
          responseJson: null,
          error: error
        });
      });
  };

  handle_Potential_Period_Search = () => {
    const { potential_start, potential_end } = this.state;
    Potential_Period(potential_start, potential_end)
      .then((response) => {
        this.setState({
          responseJson: response,
          error: null
        });
      })
      .catch((error) => {
        console.log(error);
        this.setState({
          responseJson: null,
          error: error
        });
      });
  };

  handle_AreaGeneratorSource_Area_Search = () => {
    const { source_area } = this.state;
    AreaGeneratorSource_Area(source_area)
      .then((response) => {
        this.setState({
          responseJson: response,
          error: null
        });
      })
      .catch((error) => {
        console.log(error);
        this.setState({
          responseJson: null,
          error: error
        });
      });
  };

  handle_AreaGeneratorSource_Date_Search = () => {
    const { source_date } = this.state;
    AreaGeneratorSource_Date(source_date)
      .then((response) => {
        this.setState({
          responseJson: response,
          error: null
        });
      })
      .catch((error) => {
        console.log(error);
        this.setState({
          responseJson: null,
          error: error
        });
      });
  };

  handle_AreaGeneratorSource_Period_Search = () => {
    const { source_startdate, source_enddate } = this.state;
    AreaGeneratorSource_Period(source_startdate, source_enddate)
      .then((response) => {
        this.setState({
          responseJson: response,
          error: null
        });
      })
      .catch((error) => {
        console.log(error);
        this.setState({
          responseJson: null,
          error: error
        });
      });
  };

  handle_AreaGeneratorSource_Area_Period_Search = () => {
    const { source_area, source_startdate, source_enddate } = this.state;
    AreaGeneratorSource_Area_Period(source_area, source_startdate, source_enddate )
      .then((response) => {
        this.setState({
          responseJson: response,
          error: null
        });
      })
      .catch((error) => {
        console.log(error);
        this.setState({
          responseJson: null,
          error: error
        });
      });
  };

  handle_area_Change = (e) => {
    this.setState({
      area: e.target.value
    });
  };

  handle_source_Change = (e) => {
    this.setState({
      source: e.target.value
    });
  };

  handle_area_count_Change = (e) => {
    this.setState({
      areacount: e.target.value
    });
  };

  handle_Potential_Year_Sum_Change = (e) => {
    this.setState({
      potential_year_sum: e.target.value
    });
  };

  handle_Potential_Year_Change = (e) => {
    this.setState({
      potential_year: e.target.value
    });
  };

  handle_Potential_Start_Change = (e) => {
    this.setState({
      potential_start: e.target.value
    });
  };
  handle_Potential_End_Change = (e) => {
    this.setState({
      potential_end: e.target.value
    });
  };

  handle_Source_Area_Change = (e) => {
    this.setState({
      source_area: e.target.value
    });
  };

  handle_Source_Date_Change = (e) => {
    this.setState({
      source_date: e.target.value
    });
  };

  handle_Source_startdate_Change = (e) => {
    this.setState({
      source_startdate: e.target.value
    });
  };
  handle_Source_enddate_Change = (e) => {
    this.setState({
      source_enddate: e.target.value
    });
  };

  render() {
    const { area, source, areacount, potential_year_sum, potential_year, potential_start, potential_end, source_date, source_area, source_startdate, source_enddate, responseJson, error } = this.state;

    return (
      <div>
        <div>--- 지역별 발전소 상세정보 ---</div>

        <div style={{ border: "1px solid #ccc", padding: "10px", margin: "10px" }}>
          <div>지역별 발전소 상세정보 데이터 가져오기 예시</div>
          <input type="text" value={area} onChange={this.handle_area_Change} />
          <button onClick={this.handle_GenArea_Search}>검색하기</button>
          {error && <div>Error: {error.message}</div>}
        </div>

        <div style={{ border: "1px solid #ccc", padding: "10px", margin: "10px" }}>
          <div>발전원별 발전소 상세정보 데이터 가져오기 예시</div>
          <input type="text" value={source} onChange={this.handle_source_Change} />
          <button onClick={this.handle_GenSource_Search}>검색하기</button>
          {error && <div>Error: {error.message}</div>}
        </div>

        <div style={{ border: "1px solid #ccc", padding: "10px", margin: "10px" }}>
          <div>지역별 발전소 종류(갯수) 데이터 가져오기 예시</div>
          <input type="text" value={areacount} onChange={this.handle_area_count_Change} />
          <button onClick={this.handle_GenArea_Count_Search}>검색하기</button>
          {error && <div>Error: {error.message}</div>}
        </div>
        
        <div>--- 잠재 발전량 정보 ---</div>

        <div style={{ border: "1px solid #ccc", padding: "10px", margin: "10px" }}>
          <div>잠재 발전량 데이터를 전부 가져오기(주의:엄청오래걸리거나 클라이언트가 터질수도있음)</div>
          <button onClick={this.handle_Potential_All_Search}>검색하기</button>
          {error && <div>Error: {error.message}</div>}
        </div>

        <div style={{ border: "1px solid #ccc", padding: "10px", margin: "10px" }}>
          <div>해당 연도의 지역별 잠재량 총합(태양 + 풍력) 리스트 가져오기 예시(param ex : 2022)</div>
          <input type="text" value={potential_year_sum} onChange={this.handle_Potential_Year_Sum_Change} />
          <button onClick={this.handle_Potential_Year_Sum_Search}>검색하기</button>
          {error && <div>Error: {error.message}</div>}
        </div>

        <div style={{ border: "1px solid #ccc", padding: "10px", margin: "10px" }}>
          <div>해당 연도의 지역별 잠재량을 나눠서(태양, 풍력) 리스트 가져오기 예시(param ex : 2022)</div>
          <input type="text" value={potential_year} onChange={this.handle_Potential_Year_Change} />
          <button onClick={this.handle_Potential_Year_Search}>검색하기</button>
          {error && <div>Error: {error.message}</div>}
        </div>

        <div style={{ border: "1px solid #ccc", padding: "10px", margin: "10px" }}>
          <div>지정된 기간의 모든 잠재량 데이터 가져오기 예시(param ex : 2020-10-01 12:00:00, 2020-10-05 12:00:00)</div>
          <input type="text" value={potential_start} onChange={this.handle_Potential_Start_Change} />
          <input type="text" value={potential_end} onChange={this.handle_Potential_End_Change} />
          <button onClick={this.handle_Potential_Period_Search}>검색하기</button>
          {error && <div>Error: {error.message}</div>}
        </div>

        <div>--- 재생에너지 생산 비율 정보 ---</div>
        
        <div style={{ border: "1px solid #ccc", padding: "10px", margin: "10px" }}>
          <div>지역을 파라미터로 모든 지역별 비율 정보 가져오기 예시(param ex : 서울, 경북)</div>
          <input type="text" value={source_area} onChange={this.handle_Source_Area_Change} />
          <button onClick={this.handle_AreaGeneratorSource_Area_Search}>검색하기</button>
          {error && <div>Error: {error.message}</div>}
        </div>

        <div style={{ border: "1px solid #ccc", padding: "10px", margin: "10px" }}>
          <div>특정 연월을 파라미터로 모든 지역별 비율 정보 가져오기 예시(param ex : 20-12(20년 12월))</div>
          <input type="text" value={source_date} onChange={this.handle_Source_Date_Change} />
          <button onClick={this.handle_AreaGeneratorSource_Date_Search}>검색하기</button>
          {error && <div>Error: {error.message}</div>}
        </div>

        <div style={{ border: "1px solid #ccc", padding: "10px", margin: "10px" }}>
          <div>기간을 파라미터로 모든 지역별 비율 정보 가져오기 예시(param ex : 20-10, 20-12(20년 10월 ~ 20년 12월))</div>
          <input type="text" value={source_startdate} onChange={this.handle_Source_startdate_Change} />
          <input type="text" value={source_enddate} onChange={this.handle_Source_enddate_Change} />
          <button onClick={this.handle_AreaGeneratorSource_Period_Search}>검색하기</button>
          {error && <div>Error: {error.message}</div>}
        </div>

        <div style={{ border: "1px solid #ccc", padding: "10px", margin: "10px" }}>
          <div>지역, 기간을 파라미터로 모든 지역별 비율 정보 가져오기 예시(param ex : 경북, 20-10, 20-11)</div>
          <input type="text" value={source_area} onChange={this.handle_Source_Area_Change} />
          <input type="text" value={source_startdate} onChange={this.handle_Source_startdate_Change} />
          <input type="text" value={source_enddate} onChange={this.handle_Source_enddate_Change} />
          <button onClick={this.handle_AreaGeneratorSource_Area_Period_Search}>검색하기</button>
          {error && <div>Error: {error.message}</div>}
        </div>

        <div>--- 받아온 JSON 표시 ---</div>

        <div style={{ border: "1px solid #ccc", padding: "10px", margin: "10px" }}>
          <pre>{responseJson && JSON.stringify(responseJson, null, 2)}</pre>
        </div>
      </div>
    );
  }
}

export default API_Test_Page;
