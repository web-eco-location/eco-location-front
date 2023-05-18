import React from "react";
import { Generator_DetailArea, Generator_powerSource } from "./service/ApiService";

class API_Test_Page extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      area: "",
      source: "",
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

  render() {
    const { area, source, responseJson, error } = this.state;

    return (
      <div>
        <div style={{ border: "1px solid #ccc", padding: "10px", margin: "10px" }}>
          <div>지역별 발전소 상세정보 데이터 받아오기 예시</div>
          <input type="text" value={area} onChange={this.handle_area_Change} />
          <button onClick={this.handle_GenArea_Search}>검색하기</button>
          {error && <div>Error: {error.message}</div>}
        </div>

        <div style={{ border: "1px solid #ccc", padding: "10px", margin: "10px" }}>
          <div>발전원별 발전소 상세정보 데이터 받아오기 예시</div>
          <input type="text" value={source} onChange={this.handle_source_Change} />
          <button onClick={this.handle_GenSource_Search}>검색하기</button>
          {error && <div>Error: {error.message}</div>}
        </div>

        <div style={{ border: "1px solid #ccc", padding: "10px", margin: "10px" }}>
          <pre>{responseJson && JSON.stringify(responseJson, null, 2)}</pre>
        </div>
      </div>
    );
  }
}

export default API_Test_Page;
