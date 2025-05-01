import { Component } from "react";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from "../pages/homePage";

export default class AppRoutes extends Component{
    render(){
        return(
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<HomePage />} />
                </Routes>
            </BrowserRouter>
        );
    }
}