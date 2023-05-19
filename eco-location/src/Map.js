import React from "react";
import './css/Map.css';
import boundaryData from "./boundary_potential.json";
 
function polygon(map, boundary, bg, data) { // 1회당 도/광역시 하나
  // 배경색 변경
  var backgroundColor = bg[2]+ Math.floor(15-(data-bg[0])/bg[1]).toString(16) +bg[3];

  // 이벤트
  var customOverlay = new window.kakao.maps.CustomOverlay({});
  // 마우스오버 - 배경색 변경 + 지역명 커스텀오버레이 표시
  var mouseOverHandler = function(mouseEvent) {
    polygons.forEach((polygon) => { polygon.setOptions({fillColor: '#FF0'}) });

    customOverlay.setContent('<div class="area">' + boundary.properties.CTP_KOR_NM + '</div>');
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
  if(boundary.properties.CTP_KOR_NM.length>4) {
    content.innerHTML = boundary.properties.CTP_KOR_NM.substr(0,2);
  } else {
    content.innerHTML = boundary.properties.CTP_KOR_NM.substr(0,1) + boundary.properties.CTP_KOR_NM.substr(boundary.properties.CTP_KOR_NM.length-2,1);
  }
  var label = new window.kakao.maps.CustomOverlay({ // 찍기좋게 boundary파일에 수동으로 center값을 넣었습니다
    position: new window.kakao.maps.LatLng(boundary.geometry.center[1], boundary.geometry.center[0]),  
    content: content
  });
  label.setMap(map);

  content.addEventListener("mouseover", () => polygons.forEach((polygon) => { polygon.setOptions({fillColor: '#FF0'}); }));
  content.addEventListener("mouseout", () => polygons.forEach((polygon) => { polygon.setOptions({fillColor: backgroundColor}) }));
  content.addEventListener("click", () => { // 마우스클릭 - 인포윈도우 켜기
    var infowindow = new window.kakao.maps.InfoWindow({removable: true});
    var content = '<div class="info"><div class="title">'+boundary.properties.CTP_KOR_NM+'</div>'+data+'</div>';
    infowindow.setContent(content);
    infowindow.setPosition(label.n); 
    infowindow.setMap(map);
  });

  
  // 폴리곤 생성 (구역당 여러개일 수 있음)
  var polygons = [];
  boundary.geometry.coordinates.forEach((coors) => {
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
    if(content.innerHTML=="광주"){
      polygon.setZIndex(1);
    } 
    polygon.setMap(map);
    polygons.push(polygon);

    // 이벤트 넣기
    window.kakao.maps.event.addListener(polygon, 'mouseover', mouseOverHandler);
    window.kakao.maps.event.addListener(polygon, 'mousemove', mouseMoveHandler);
    window.kakao.maps.event.addListener(polygon, 'mouseout', mouseOutHandler);
  });
}

function map(by, items) {  // 맵 그리는 함수
  const container = document.getElementById('map');
  const options = {
    center: new window.kakao.maps.LatLng(35.8, 128),  // lat은 세로 lng은 가로 
    level: 13,
  };
  const map = new window.kakao.maps.Map(container, options);
  // map.setMapTypeId(window.kakao.maps.MapTypeId.SKYVIEW);

  // 배경색 계산용
  var maxValue, minValue, d;
  
  // 다각형 그리기
  items.forEach((item) => { // 차마 눈뜨고 못봐줄 코드...
    if(by=="total") {
      maxValue = items.reduce((max, p) => p.data > max ? p.data : max, items[0].data); 
      minValue = items.reduce((min, p) => p.data < min ? p.data : min, items[0].data); 
      d = (maxValue-minValue+1)/10;
      polygon(map, boundaryData.features.find((b) => b.properties.CTP_ENG_NM==item.area), [minValue, d, "#00", "F00"], item.data);
    } else if(by=="source1") {
      maxValue = items.reduce((max, p) => p.potentialOfSolar > max ? p.potentialOfSolar : max, items[0].potentialOfSolar); 
      minValue = items.reduce((min, p) => p.potentialOfSolar < min ? p.potentialOfSolar : min, items[0].potentialOfSolar); 
      d = (maxValue-minValue+1)/10;
      polygon(map, boundaryData.features.find((b) => b.properties.CTP_ENG_NM==item.area), [minValue, d, "#", "F0000"], item.potentialOfSolar);
    } else if(by=="source2") {
      maxValue = items.reduce((max, p) => p.potentialOfWind > max ? p.potentialOfWind : max, items[0].potentialOfWind); 
      minValue = items.reduce((min, p) => p.potentialOfWind < min ? p.potentialOfWind : min, items[0].potentialOfWind); 
      d = (maxValue-minValue+1)/10;
      polygon(map, boundaryData.features.find((b) => b.properties.CTP_ENG_NM==item.area), [minValue, d, "#0000", "F"], item.potentialOfWind);
    }
  });
}

class KakaoMap extends React.Component {
  componentDidUpdate() {
    // 지도 그리기
    window.kakao.maps.load(() => {map(this.props.by, this.props.items)});
  }

  componentDidMount() {
    // kakao map api 스크립트
    const script = document.createElement("script");
    script.type="text/javascript";
    script.src=`//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.REACT_APP_KAKAO_MAP_KEY}&autoload=false&libraries=services,clusterer&`;
    script.async = true;
    document.head.appendChild(script);

    // 지도 그리기
    script.onload = () => { window.kakao.maps.load(() => {map(this.props.by, this.props.items)}) };
  }

  render() {
    return(
      <div className="mapContainer">
        <div id="map"></div>
      </div>
    );
  }
}
export default KakaoMap;