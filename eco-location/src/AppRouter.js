import React from "react";
import "./css/index.css";

import { BrowserRouter, Routes, Route} from "react-router-dom";

import Header from "./Header.js"

<<<<<<< HEAD
// import TotalPotential from "./TotalPotential";
// import SourcePotential from "./SourcePotential";
// import Gen_total from './Gen_total';
// import Gen_detail from './Gen_detail';
// import Gen_year from './Gen_year';
import API_Test_Page from './API_Test_Page';
=======
//import TotalPotential from "./TotalPotential";
//import SourcePotential from "./SourcePotential";
// import Gen_total from './Gen_total';
// import Gen_detail from './Gen_detail';
// import Gen_year from './Gen_year';
import Exist_Gen from './Exist_Gen';
>>>>>>> feature/exist-generator

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
                        {/* <Route path="/potential_total" element={<TotalPotential/>}></Route>
                        <Route path="/potential_source" element={<SourcePotential/>}></Route>
                        <Route path="/potential_year" element={<TotalPotential/>}></Route> */}
                        
                        {/* 기존 발전소 */}
<<<<<<< HEAD
                        
=======
                        <Route path="/exist_gen" element={<Exist_Gen/>}></Route>

>>>>>>> feature/exist-generator
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