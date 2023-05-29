import React from "react";
import "./css/index.css";

import { BrowserRouter, Routes, Route, Navigate} from "react-router-dom";

import Header from "./Header.js"

import TotalPotential from "./TotalPotential";
import YearPotential from "./YearPotential";
import RenewablePercent from "./RenewablePercent";
// import Gen_total from './Gen_total';
// import Gen_detail from './Gen_detail';
// import Gen_year from './Gen_year';
import API_Test_Page from './API_Test_Page';
import Exist_Gen from './Exist_Gen';

class AppRouter extends React.Component {
    render() {
        return (
            <BrowserRouter>
                <Header/>
                <div>
                    <Routes>
                        {/* 기본 페이지는 재생에너지 전환율 페이지로 */}
                        <Route path="/" element={<Navigate to="/renewable-percent" />} />
                        
                        {/* 과거 재생에너지 발전량 */}
                        {/* <Route path="/gen-total" element={<Gen_total />}></Route> */}
                        {/* <Route path="/gen-year" element ={<Gen_year />}></Route> */}
                        {/* <Route path="/gen-detail" element ={<Gen_detail />}></Route> */}

                        {/* 재생에너지 잠재력 확인 */}
                        <Route path="/potential-total" element={<TotalPotential/>}></Route>
                        <Route path="/potential-year" element={<YearPotential/>}></Route>
                        
                        {/* 기존 발전소 */}
                        <Route path="/exist-gen" element={<Exist_Gen/>}></Route>

                        {/* 재생에너지 전환율 */}
                        <Route path="/renewable_percent" element={<RenewablePercent/>}></Route>

                        {/* API 테스트용 페이지 */}
                        <Route path="/test-page" element={<API_Test_Page/>}></Route>

                    </Routes>
                </div>
            </BrowserRouter>
        );
    }
}

export default AppRouter;