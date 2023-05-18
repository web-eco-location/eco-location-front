import React from "react";
import './css/Header.css';
import {Link} from 'react-router-dom';

class Header extends React.Component {
    render() { 
        return(
            <div className="headerContainer">
                <div className="nav">
                    <div className="item">
                        <Link to="/">에코로케이션</Link>
                    </div>
                    <div className="item">
                        <Link to="/Gen_total">과거 재생에너지 발전량</Link>
                        <div className="dropdown">
                            <Link to="/Gen_total">지역별 발전량</Link>
                            <Link to="/Gen_year">연도별 발전량</Link>
                            <Link to="/Gen_detail">지역별 발전량 상세</Link>
                        </div>
                    </div>
                    <div className="item">
                        <Link to="/potential_total">재생에너지 잠재량 확인</Link>
                        <div className="dropdown">
                            <Link to="/potential_total">지역별 잠재량</Link>
                            <Link to="/potential_year">시간별 잠재량</Link>
                        </div>
                    </div>
                    <div className="item">
                        <Link to="/">기존 발전소</Link>
                        <div className="dropdown">
                            <Link to="/">지역별 발전소 확인</Link>
                            <Link to="/">발전원별 발전소 위치</Link>
                            <Link to="/">발전소 상세정보</Link>
                        </div>
                    </div>
                    <div className="item">
                        <Link to="/">재생에너지 전환율</Link>
                        <div className="dropdown">
                            <Link to="/">국내 재생에너지 생산비율</Link>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Header;