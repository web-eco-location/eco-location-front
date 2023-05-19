import React from 'react';
import './css/SourcePotential.css';

class Exist_Gen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      loading: true,
    };
    this.mapContainer = null;
    this.mapOption = null;
    this.map = null;
  }

  componentDidMount() {
    this.mapContainer = document.getElementById('map');
    this.mapOption = {
      center: new window.kakao.maps.LatLng(33.450701, 126.570667),
      level: 3,
    };
    this.map = new window.kakao.maps.Map(this.mapContainer, this.mapOption);
    this.setState({ loading: false });
  }

  render() {
    var map = this.state.items.length > 0 ? this.map : null;

    var sourcePotentialPage = (
      <div className="pageContainer">
        {map}
        <div className="side"></div>
      </div>
    );

    var loadingPage = <h1>...</h1>;
    var content = loadingPage;

    if (!this.state.loading) {
      console.log('loading end');
      content = sourcePotentialPage;
    }

    return <div className="container">{content}</div>;
  }
}

export default Exist_Gen;
