import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import App from "./App";

class AppRouter extends React.Component {
    render() {
        return(
            <BrowserRouter>
                <div>
                    <Routes>
                        {/* 미완 */}
                        <Route path="/chat" element={<App />} /> 
                    </Routes>
                </div>
            </BrowserRouter>
        );
    }
}

export default AppRouter;