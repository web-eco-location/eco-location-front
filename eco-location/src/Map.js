import React from "react";
import './css/Map.css';

import boundaryData from "./boundary.json";

// function marker(map, item) { // mapmarker사용x
//   var markerPosition  = new window.kakao.maps.LatLng( item.lat, item.lng ); 
//   var marker = new window.kakao.maps.Marker({ position: markerPosition });
//   marker.setMap(map);

//   var infowindow = new window.kakao.maps.InfoWindow({
//       position : markerPosition,
//       content : '<div class="info">'+item.content+'</div>'
//   });

//   window.kakao.maps.event.addListener(marker, 'mouseover', function() {
//       infowindow.open(map, marker);
//   });
//   window.kakao.maps.event.addListener(marker, 'mouseout', function() {
//       infowindow.close();
//   });
// }

function polygon(map, binary, item) {
  console.log(binary.properties.CTP_KOR_NM, item.location);
  binary.geometry.coordinates.forEach((coors) => {
    var path = [];
    coors.forEach((coor) => { // 카카오 위도경도로 타입변환 (파일이랑 위도경도가 반대임!!!!!!!!)
      path.push(new window.kakao.maps.LatLng(coor[1], coor[0]));
    })
    
    var polygon = new window.kakao.maps.Polygon({
      path:path, // 그려질 다각형의 좌표 배열입니다
      strokeWeight: 2,  // 선 두께
      strokeColor: '#004c80', // 선 색깔
      fillColor: '#00'+ Math.floor(16-item.content/500).toString(16) +'F00', // 배경색 변경 테스트
      fillOpacity: 1 // 채우기 투명도
    });
    polygon.setMap(map);

    // 목표) 폴리곤 안에 글자(강원도, 경상북도...) 띄우고 싶음
    // 문제) 폴리곤 위에 마우스가 움직일때 인식이 잘 안되는듯 엄청나게 깜박거림
    
    // var customOverlay = new window.kakao.maps.CustomOverlay({});
    // var infowindow = new window.kakao.maps.InfoWindow({removable: true});
  
    // 마우스오버 - 배경색 변경 + 지역명 커스텀오버레이 표시
    // window.kakao.maps.event.addListener(polygon, 'mouseover', function(mouseEvent) {
    //   polygon.setOptions({fillColor: '#09f'});
  
    //   customOverlay.setContent('<div class="area">' + item.properties.CTP_KOR_NM + '</div>');
    //   customOverlay.setPosition(mouseEvent.latLng); 
    //   customOverlay.setMap(map);
    // });
  
    // 마우스이동 - 커스텀오버레이 위치 변경 
    // window.kakao.maps.event.addListener(polygon, 'mousemove', function(mouseEvent) {
    //   customOverlay.setPosition(mouseEvent.latLng); 
    // });
  
    // 마우스아웃 - 배경색 원래대로 + 커스텀오버레이 제거 
    // window.kakao.maps.event.addListener(polygon, 'mouseout', function() {
    //   polygon.setOptions({fillColor: '#fff'});
    //   customOverlay.setMap(null);
    // }); 
  
    // 마우스클릭 - 인포윈도우 켜기
    // window.kakao.maps.event.addListener(polygon, 'click', function(mouseEvent) {
    //   var content = '<div class="info">' + 
    //               '   <div class="title">' + item.properties.CTP_KOR_NM + '</div>' +
    //               '</div>';
  
    //   infowindow.setContent(content); 
    //   infowindow.setPosition(mouseEvent.latLng); 
    //   infowindow.setMap(map);
    // });
  })

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
          center: new window.kakao.maps.LatLng(36.3, 128),  // lat은 세로 lng은 가로 
          level: 13,
        };
        const map = new window.kakao.maps.Map(container, options);

        // 마커 그리기
        // this.state.items.forEach((item) => {marker(map, item)});

        // 다각형 그리기 (지역이름 맞춰서 데이터 넣어야하는데 일단 수동으로 정렬해서 돌림)
        boundaryData.features.forEach((binary, index) => {polygon(map, binary, this.state.items[index])});
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
