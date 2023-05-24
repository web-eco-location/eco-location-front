import React from "react";
import "./css/index.css";

import { BrowserRouter, Routes, Route} from "react-router-dom";

import Header from "./Header.js"

import TotalPotential from "./TotalPotential";
import YearPotential from "./YearPotential";
// import Gen_total from './Gen_total';
// import Gen_detail from './Gen_detail';
// import Gen_year from './Gen_year';
import API_Test_Page from './API_Test_Page';

class AppRouter extends React.Component {
    render() {
        return (
            <BrowserRouter>
                <Header/>
                <div>
                    <Routes>
                        {/* <Route path="/" element={<TestPage />}></Route> */}
                        
                        {/* 과거 재생에너지 발전량 */}
                        {/* <Route path="/Gen_total" element={<Gen_total />}></Route> */}
                        {/* <Route path="/Gen_year" element ={<Gen_year />}></Route> */}
                        {/* <Route path="/Gen_detail" element ={<Gen_detail />}></Route> */}

                        {/* 재생에너지 잠재력 확인 */}
                        <Route path="/potential_total" element={<TotalPotential/>}></Route>
                        <Route path="/potential_year" element={<YearPotential/>}></Route>
                        
                        {/* 기존 발전소 */}
                        
                        {/* 재생에너지 전환율 */}

                        {/* API 테스트용 페이지 */}
                        <Route path="/test_page" element={<API_Test_Page/>}></Route>

                    </Routes>
                </div>
            </BrowserRouter>
        );
    }
}

export default AppRouter;