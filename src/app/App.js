import './App.css';
import Header from "../components/general/header/Header";
import React, {useEffect, useState} from "react";
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
import {PurchaseTicketPage} from "../components/pages/purchase-ticket-page/PurchaseTicketPage";
import {useDispatch, useSelector} from "react-redux";
import {ModalWindow} from "../components/general/modal/ModalWindow";
import {uiActions} from "../store/slices/ui-slice";
import {LoginComponent} from "../components/general/modal/login_component";
import {logInBackend, signUpBackend} from "../store/slices/user-slice";
import {getMoviesFromBackend} from "../store/slices/movie-slice";
import {getGoodsFromBackend} from "../store/slices/goods-slice";
import {StatsPage} from "../components/pages/stats-page/StatsPage";

function App() {
    const dispatcher = useDispatch();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const {isModalWindowOpen, isLogInSelected} = useSelector(state => state.ui);

    const handleModalWindowStateChange = (value) => {
        dispatcher(uiActions.changeModalWindowState(value));
    }

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const login = ({ login, password }) => {
        dispatcher(logInBackend({login, password}));
    };
    const signUp = ({login, password}) => {
        dispatcher(signUpBackend({login, password}));
    }
    useEffect(() => {
        dispatcher(logInBackend());
        dispatcher(getMoviesFromBackend());
        dispatcher(getGoodsFromBackend());
    }, []);


    return (
        <Router>
            <Header isMenuOpen={isMenuOpen} toggleMenu={toggleMenu}/>
            {
                isModalWindowOpen && <ModalWindow closeModalWindow={() => handleModalWindowStateChange(false)}>
                    <LoginComponent
                        event={isLogInSelected ? login : signUp}
                        closeModelWindow={() => handleModalWindowStateChange(false)}
                        submitName={isLogInSelected ? 'Login' : 'Sign up'}
                    ></LoginComponent>
                </ModalWindow>
            }
            <div className={`${isMenuOpen || isModalWindowOpen ? 'blurred' : ''}`}
                 onClick={() => handleModalWindowStateChange(false)}>
                <Routes>
                    <Route path="/" element={<HomePage/>}/>
                    <Route path="/schedule" element={<SchedulePage/>}/>
                    <Route path="/films" element={<FilmsPage/>}/>
                    <Route path="/film/:id" element={<FilmPage/>}/>
                    <Route path="/purchase/:id" element={<PurchaseTicketPage/>}/>
                    <Route path="/profile" element={<ProfilePage/>}/>
                    <Route path="/statistic" element={<StatsPage/>}/>
                </Routes>
            </div>
            <Footer></Footer>
        </Router>


    );
}

export default App;
