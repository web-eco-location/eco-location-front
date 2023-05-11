import React from "react";
import './css/Map.css';
import boundaryData from "./boundary.json";

function polygon(map, binary, item) { // 1회당 도/광역시 하나
  // 배경색 변경 (테스트)
  var backgroundColor = '#00'+ Math.floor(16-item.content/500).toString(16) +'F00';

  // 이벤트
  var customOverlay = new window.kakao.maps.CustomOverlay({});
  // 마우스오버 - 배경색 변경 + 지역명 커스텀오버레이 표시
  var mouseOverHandler = function(mouseEvent) {
    polygons.forEach((polygon) => { polygon.setOptions({fillColor: '#FF0'}) });

    customOverlay.setContent('<div class="area">' + binary.properties.CTP_KOR_NM + '</div>');
    customOverlay.setPosition(mouseEvent.latLng);
    customOverlay.setMap(map);
  };
  
  // 마우스이동 - 커스텀오버레이 위치 변경
  var mouseMoveHandler = function(mouseEvent) {
    customOverlay.setPosition(mouseEvent.latLng); 
  };
  
  // 마우스아웃 - 배경색 원래대로 + 커스텀오버레이 제거 
  var mouseOutHandler = function() {
    polygons.forEach((polygon) => { polygon.setOptions({fillColor: backgroundColor}) });
    
    customOverlay.setMap(null);
  };
    

  // 구역 이름 라벨 생성
  var content = document.createElement('div');
  content.className = 'label';
  if(item.location.length>4) {
    content.innerHTML = item.location.substr(0,2);
  } else {
    content.innerHTML = item.location.substr(0,1) + item.location.substr(item.location.length-2,1);
  }
  var label = new window.kakao.maps.CustomOverlay({ // 찍기좋게 boundary파일에 수동으로 center값을 넣었습니다
    position: new window.kakao.maps.LatLng(binary.geometry.center[1], binary.geometry.center[0]),  
    content: content
  });
  label.setMap(map);

  content.addEventListener("mouseover", () => polygons.forEach((polygon) => { polygon.setOptions({fillColor: '#FF0'}); }));
  content.addEventListener("mouseout", () => polygons.forEach((polygon) => { polygon.setOptions({fillColor: backgroundColor}) }));
  content.addEventListener("click", () => { // 마우스클릭 - 인포윈도우 켜기
    var infowindow = new window.kakao.maps.InfoWindow({removable: true});
    var content = '<div class="info"><div class="title">'+binary.properties.CTP_KOR_NM+'</div>'+item.content+'</div>';
    infowindow.setContent(content);
    infowindow.setPosition(label.n); 
    infowindow.setMap(map);
  });

  
  // 폴리곤 생성 (구역당 여러개일 수 있음)
  var polygons = [];
  binary.geometry.coordinates.forEach((coors) => {
    // 카카오 위도경도로 타입변환 (파일이랑 위도경도가 반대임)
    var path = [];
    coors.forEach((coor) => { 
      path.push(new window.kakao.maps.LatLng(coor[1], coor[0]));
    })

    // 폴리곤 그리기
    var polygon = new window.kakao.maps.Polygon({
      path:path, // 좌표 배열
      strokeWeight: 2,  // 선 두께
      strokeColor: '#004c80', // 선 색깔
      fillColor: backgroundColor, 
      fillOpacity: 1 // 채우기 투명도
    });
    polygon.setMap(map);
    polygons.push(polygon);

    // 이벤트 넣기
    window.kakao.maps.event.addListener(polygon, 'mouseover', mouseOverHandler);
    window.kakao.maps.event.addListener(polygon, 'mousemove', mouseMoveHandler);
    window.kakao.maps.event.addListener(polygon, 'mouseout', mouseOutHandler);
  });
}

class KakaoMap extends React.Component {
  constructor(props) {  
    super(props);
    this.state = { items: props.items };
  }

  componentDidMount() {
    // kakao map api 스크립트
    const script = document.createElement("script");
    script.type="text/javascript";
    script.src=`//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.REACT_APP_KAKAO_MAP_KEY}&autoload=false&libraries=services,clusterer&`;
    script.async = true;
    document.head.appendChild(script);

    // 지도 그리기
    script.onload = () => {
      window.kakao.maps.load(() => {
        const container = document.getElementById('map');
        const options = {
          center: new window.kakao.maps.LatLng(36.2, 128),  // lat은 세로 lng은 가로 
          level: 13,
        };
        const map = new window.kakao.maps.Map(container, options);
        map.setMapTypeId(window.kakao.maps.MapTypeId.SKYVIEW);

        // 다각형 그리기
        boundaryData.features.forEach((binary) => {
          polygon(map, binary, this.state.items.find((item) => item.location===binary.properties.CTP_KOR_NM));
        });
      });
    };
  }

  render() {
    // 테스트용 데이터, 값을 아예 안주면 undefined
    var testData = [
      {location:"강원도", content:4000},
      {location:"경기도", content:3000},
      {location:"경상남도", content:4000},
      {location:"경상북도", content:3000},
      {location:"광주광역시", content:1000},
      {location:"대구광역시", content:1000},
      {location:"대전광역시", content:1000},
      {location:"부산광역시", content:1000},
      {location:"서울특별시", content:100},
      {location:"세종특별자치시", content:2000},
      {location:"울산광역시", content:1000},
      {location:"인천광역시", content:1000},
      {location:"전라남도", content:4000},
      {location:"전라북도", content:3000},
      {location:"제주특별자치도", content:5000},
      {location:"충청남도", content:4000},
      {location:"충청북도", content:3000},
    ];
    this.state.items = testData;

    return(
      <div className="mapContainer">
        <div id="map"></div>
      </div>
    );
  }
}
export default KakaoMap;
