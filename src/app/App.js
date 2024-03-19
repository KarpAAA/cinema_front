import './App.css';
import Header from "../components/general/header/Header";
import React, {useState} from "react";
import HomePage from "../components/pages/home-page/HomePage";
import {
    BrowserRouter as Router,
    Routes,
    Route,
} from "react-router-dom";
import {Footer} from "../components/general/footer/Footer";
import SchedulePage from "../components/pages/schedule-page/SchedulePage";
import {FilmsPage} from "../components/pages/films-page/FilmsPage";
import {FilmPage} from "../components/pages/film-page/FilmPage";
import {ProfilePage} from "../components/pages/profile-page/ProfilePage";

function App() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (

        <Router>
            <Header isMenuOpen={isMenuOpen} toggleMenu={toggleMenu}/>
            <div className={`${isMenuOpen ? 'blurred' : ''}`}>
                <Routes>
                    <Route path="/" element={<HomePage/>}/>
                    <Route path="/schedule" element={<SchedulePage/>}/>
                    <Route path="/films" element={<FilmsPage/>}/>
                </Routes>
            </div>
            <Footer></Footer>
        </Router>


    );
}

export default App;
