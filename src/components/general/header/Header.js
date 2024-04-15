import React from 'react';
import './Header.css';
import {Link} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {userActions} from "../../../store/slices/user-slice";
import {uiActions} from "../../../store/slices/ui-slice";

const Header = ({isMenuOpen, toggleMenu}) => {
    const dispatch = useDispatch();
    const {isLoggedIn} = useSelector(state => state.user);
    const handleLogOut = () => {
        dispatch(userActions.userLogOut());
    }

    const handleLogIn = () => {
        dispatch(uiActions.changeModalWindowState(true));
        dispatch(uiActions.changeModalContent(true));
    }
    const handleSignUp = () => {
        dispatch(uiActions.changeModalWindowState(true));
        dispatch(uiActions.changeModalContent(false));
    }
    return (
        <div className="header">
            <div className={`burger-menu ${isMenuOpen ? 'open' : ''}`} onClick={toggleMenu}>
                <div className="bar1"></div>
                <div className="bar2"></div>
                <div className="bar3"></div>
            </div>
            <div style={{display: 'flex'}}>
                {/*<div className={'header-element'}>Location</div>*/}

                {isLoggedIn ?
                    <div className={'header-element'} onClick={handleLogOut}>Log out</div>
                    :
                    <div className={'header-element'} onClick={handleLogIn}>Log in</div>
                }

                {!isLoggedIn && <div className={'header-element'} onClick={handleSignUp}>Sign up</div>}
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
                        {/*<div className="burger-menu-element">Help</div>*/}
                        {/*<div className="burger-menu-element">About us</div>*/}
                    </div>
                    {isLoggedIn ?
                        <div className={'header-element'}>
                            <Link to={'/profile'} className={'menu-link'}>
                                Profile
                            </Link>
                        </div>
                        :
                        <div className={'header-element'} onClick={handleLogIn}>Log in</div>
                    }
                </div>
            )}
        </div>
    );
};

export default Header;
