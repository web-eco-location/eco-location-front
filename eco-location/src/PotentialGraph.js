import React from "react";
import './css/Map.css';
import boundaryData from "./boundary_potential.json";

class PotentialGraph extends React.Component {
    // 맵 그리는 함수
    map = () => {  
        const container = document.getElementById('map');
        const options = {
            center: new window.kakao.maps.LatLng(35.8, 128),  // lat은 세로 lng은 가로 
            level: 13,
        };
        const map = new window.kakao.maps.Map(container, options);
        // map.setMapTypeId(window.kakao.maps.MapTypeId.SKYVIEW);
        map.setZoomable(false);
    
        // 배경에 흰색 덮기
        var path = [];
        path.push(new window.kakao.maps.LatLng(44.13, 115.1));
        path.push(new window.kakao.maps.LatLng(44.02, 139.9));
        path.push(new window.kakao.maps.LatLng(31.05, 137.8));
        path.push(new window.kakao.maps.LatLng(31.08, 117.04));
        var back = new window.kakao.maps.Polygon({
            path:path,
            strokeWeight: 2,  // 선 두께
            strokeColor: "#666666", // 선 색깔
            strokeOpacity: 0.6,
            fillColor: "#FFFFFF", 
            fillOpacity: 0.6 // 채우기 투명도
        });
        back.setMap(map);
    
        // 다각형 그리기
        this.props.items.forEach((item) => {
            if(this.props.by=="total") {
                polygon(map, boundaryData.features.find((b) => b.properties.CTP_KOR_NM===item.areaName), this.props.bgData, item.potentialAmount, this.props.sideInfo);
            } else if(this.props.by=="source1") {
                polygon(map, boundaryData.features.find((b) => b.properties.CTP_KOR_NM===item.areaName), this.props.bgData, item.solarEnergyPotential, this.props.sideInfo);
            } else if(this.props.by=="source2") {
                polygon(map, boundaryData.features.find((b) => b.properties.CTP_KOR_NM===item.areaName), this.props.bgData, item.windEnergyPotential, this.props.sideInfo);
            }
        });
    }

    componentDidUpdate() {
        // 스크립트 로드 완료 여부 확인
        if (typeof window.kakao !== "undefined" && typeof window.kakao.maps !== "undefined") {
            // 지도 그리기
            this.map();
        }
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
            window.kakao.maps.load(() => { // 맵 함수 파라미터 에바라서 클래스 안으로 끌고들어옴
                this.map()
            })
        };
    }

    render() {
        return(
        <div className="mapContainer">
            <div id="map"></div>
        </div>
        );
    }
}
export default PotentialGraph;