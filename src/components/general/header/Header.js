import React from 'react';
import './Header.css';
import {Link} from "react-router-dom";

const Header = ({isMenuOpen, toggleMenu}) => {


    return (
        <div className="header">
            <div className={`burger-menu ${isMenuOpen ? 'open' : ''}`} onClick={toggleMenu}>
                <div className="bar1"></div>
                <div className="bar2"></div>
                <div className="bar3"></div>
            </div>
            <div style={{display: 'flex'}}>
                <div className={'header-element'}>Location</div>
                <div className={'header-element'}>Log in</div>
                <div className={'header-element'}>Sign up</div>
            </div>

            {isMenuOpen && (
                <div className="overlay show" onClick={toggleMenu}>
                    <div>
                        <div className="burger-menu-element">
                            <Link to={'/'} className={'menu-link'}>
                                Home page
                            </Link>
                        </div>
                        <div className="burger-menu-element">
                            <Link to={'/schedule'} className={'menu-link'}>
                                Schedule
                            </Link>
                        </div>
                        <div className="burger-menu-element">
                            <Link to={'/films'} className={'menu-link'}>
                                Films
                            </Link>
                        </div>
                        <div className="burger-menu-element">Help</div>
                        <div className="burger-menu-element">About us</div>
                    </div>
                    <div>
                        Log in
                    </div>
                </div>
            )}
        </div>
    );
};

export default Header;
