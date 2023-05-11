import React from "react";
import './css/Header.css';

class Header extends React.Component {
render() { 
    return(
            <div className="headerContainer">
                <div className="nav">
                    <div className="item">
                        <a href="/">에코로케이션</a>
                    </div>
                    <div className="item">
                        <a href="/">과거 재생에너지 발전량</a>
                        <div className="dropdown">
                            <a href="/">지역별 발전량</a>
                            <a href="/">연도별 발전량</a>
                            <a href="/">지역별 발전량 상세</a>
                        </div>
                    </div>
                    <div className="item">
                        <a href="/">재생에너지 잠재량 확인</a>
                        <div className="dropdown">
                            <a href="/">지역별 잠재량</a>
                            <a href="/">발전원별 잠재량</a>
                            <a href="/">시간별 잠재량</a>
                        </div>
                    </div>
                    <div className="item">
                        <a href="/">기존 발전소</a>
                        <div className="dropdown">
                            <a href="/">지역별 발전소 확인</a>
                            <a href="/">발전원별 발전소 위치</a>
                            <a href="/">발전소 상세정보</a>
                        </div>
                    </div>
                    <div className="item">
                        <a href="/">재생에너지 전환율</a>
                        <div className="dropdown">
                            <a href="/">국내 재생에너지 생산비율</a>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Header;